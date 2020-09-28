#ifndef StudentItemDelegate_H
#define StudentItemDelegate_H

#include <QStyledItemDelegate>


class StudentItemDelegate : public QStyledItemDelegate
{
	Q_OBJECT
public:
	explicit StudentItemDelegate(QObject *parent = nullptr);
	// QStyledItemDelegate overrides
	void paint(QPainter *painter, const QStyleOptionViewItem &option, const QModelIndex &index) const override;
	//QWidget *createEditor(QWidget *parent, const QStyleOptionViewItem &option, const QModelIndex &index) const override;
	//void setEditorData(QWidget *editor, const QModelIndex &index) const override;
	//void setModelData(QWidget *editor, QAbstractItemModel *model, const QModelIndex &index) const override;
	//QSize sizeHint(const QStyleOptionViewItem &option, const QModelIndex &index) const override;

};

#endif // StudentItemDelegate_H
