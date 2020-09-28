#include "mainwindow.h"
#include "ui_mainwindow.h"

#include <QNetworkAccessManager>
#include <QNetworkReply>
#include <QMessageBox>
#include <QDataWidgetMapper>

#include "DataStore.h"
#include "StudentDataModel.h"
#include "StudentItemDelegate.h"
#include "StudentForm.h"
#include <QDebug>


MainWindow::MainWindow(QWidget *parent)
	: QMainWindow(parent)
	, ui(new Ui::MainWindow)
{
	ui->setupUi(this);


	StudentItemDelegate* delegate = new StudentItemDelegate(ui->studentTableView);
    DataStore* dataStore = new DataStore(this);
	StudentDataModel* model = new StudentDataModel(dataStore);

	ui->studentTableView->setModel(model);
	ui->studentTableView->setItemDelegate(delegate);


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
                   dataModel->dataChanged(dataModel->index(row, ImageColumnIndex), dataModel->index(row, ImageColumnIndex), {Qt::DecorationRole});
               });
            }
        }
    });

	connect(ui->studentTableView, &QTableView::doubleClicked, [=](const QModelIndex& index){

		StudentForm* studentForm = new StudentForm(index, ui->studentTableView);
		studentForm->setAttribute(Qt::WA_DeleteOnClose);
		studentForm->show();
	});

	connect(ui->insertNew, &QPushButton::clicked, [=](){
		int rowCount = model->rowCount();
		model->insertRow(rowCount);//QModelIndex(), model->rowCount(), model->rowCount());
		rowCount = model->rowCount();
		//model->removeRow(0);

		ui->studentTableView->setModel(model);

		//QMessageBox::warning(this,"", QString("row count: ") + QString::number(rowCount));

		int n = 90;

		//StudentForm* studentForm = new StudentForm(model->index(model->rowCount()-1, 0), ui->studentTableView);
		//studentForm->setAttribute(Qt::WA_DeleteOnClose);
		//studentForm->show();

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

	manager->get(QNetworkRequest(QUrl("http://127.0.0.1:8087/")));

}

