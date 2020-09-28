#ifndef STUDENTFORM_H
#define STUDENTFORM_H

#include <QDialog>

class QDataWidgetMapper;
#include <QPersistentModelIndex>

#include <QStandardItemModel>
#include <QStringListModel>

namespace Ui {
class StudentForm;
}

class StudentForm : public QDialog
{
	Q_OBJECT

public:
	explicit StudentForm(const QModelIndex& index, QWidget *parent = nullptr);
	~StudentForm();

private slots:
	void on_pushButton_clicked();

	void on_buttonBox_accepted();

private:
	Ui::StudentForm *ui;

	QDataWidgetMapper* _mapper;
	QPersistentModelIndex _index;

	QStandardItemModel *_model;
	QStringListModel *_typeModel;
};

#endif // STUDENTFORM_H
