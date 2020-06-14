#include "mainwindow.h"
#include "ui_mainwindow.h"

#include <QNetworkAccessManager>
#include <QNetworkReply>
#include <QMessageBox>

#include "DataStore.h"
#include "StudentDataModel.h"
#include "StudentItemDelegate.h"


MainWindow::MainWindow(QWidget *parent)
	: QMainWindow(parent)
	, ui(new Ui::MainWindow)
{
	ui->setupUi(this);

    ui->studentTableView->setItemDelegate(new StudentItemDelegate(ui->studentTableView));
    DataStore* dataStore = new DataStore(this);

    ui->studentTableView->setModel(new StudentDataModel(dataStore));

    connect(dataStore, &DataStore::refreshed, [=](bool success) {
        if(!success) {
            QMessageBox::warning(nullptr, "Connection", "Connection failed");
        } else {
            // old selection model should be deleted manually
            QItemSelectionModel* oldSelectionModel = ui->studentTableView->selectionModel();
            // new model TODO: find way to reset model later
            StudentDataModel* dataModel = new StudentDataModel(dataStore, ui->studentTableView);
            ui->studentTableView->setModel(dataModel);
            // delete here
            delete oldSelectionModel;

            for(auto imageName: dataStore->imageMap().keys()) {
               AsyncImageLoader* asyncImageObject = dataStore->imageMap().value(imageName);
               int row = dataStore->indexOfImage(imageName);
               connect(asyncImageObject, &AsyncImageLoader::imageLoadFinished, [=]() {
                   qDebug()<<"Image update on row: "<<row;
                   dataModel->dataChanged(dataModel->index(row, IMAGE_COLUMN_INDEX), dataModel->index(row, IMAGE_COLUMN_INDEX), {Qt::DecorationRole});
               });
            }
        }
    });
}

MainWindow::~MainWindow()
{
	delete ui;
}

void MainWindow::on_pushButton_clicked()
{
    QNetworkAccessManager* manager = new QNetworkAccessManager(this);

    connect(manager, &QNetworkAccessManager::finished, DataStore::instance(), &DataStore::replyToSelectFinished);
    connect(manager, &QNetworkAccessManager::finished, manager, &QNetworkAccessManager::deleteLater);

    manager->get(QNetworkRequest(QUrl("http://127.0.0.1:8388/")));

}
