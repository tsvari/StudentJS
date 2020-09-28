#include "StudentForm.h"
#include "ui_studentform.h"
#include <QDataWidgetMapper>
#include <QMessageBox>
#include <QTableView>

StudentForm::StudentForm(const QModelIndex& index, QWidget *parent) :
	QDialog(parent),
	ui(new Ui::StudentForm),
	_index(index)
{
	ui->setupUi(this);
	QTableView* tableView = qobject_cast<QTableView*>(parentWidget());
	Q_ASSERT(tableView);

	_mapper = new QDataWidgetMapper(this);
	_mapper->setModel(const_cast<QAbstractItemModel*>(index.model()));
	//_mapper->setItemDelegate(tableView->itemDelegate());

	_mapper->setSubmitPolicy(QDataWidgetMapper::ManualSubmit);

	_mapper->addMapping(ui->uidEdit, 0);
	_mapper->addMapping(ui->nameEdit, 1);
	_mapper->setCurrentModelIndex(index);

	// TODO:
	//ui->gradeCobo->setModel(const_cast<QAbstractItemModel*>(index.model()));
	//ui->gradeCobo->setModelColumn(1);
}

StudentForm::~StudentForm()
{
	delete ui;
}

void StudentForm::on_pushButton_clicked()
{

}

void StudentForm::on_buttonBox_accepted()
{
	// wait to send data to server
	// than submit
	_mapper->submit();

}
