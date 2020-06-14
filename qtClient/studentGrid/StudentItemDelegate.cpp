#include "StudentItemDelegate.h"
#include "mainwindow.h"
#include "DataStore.h"

#include <QLineEdit>
#include <QEvent>
#include <QMouseEvent>
#include <QMessageBox>
#include <QDateEdit>
#include <QPushButton>
#include <QApplication>
#include <QDebug>


StudentItemDelegate::StudentItemDelegate(QObject *parent) : QStyledItemDelegate(parent)
{
}

void StudentItemDelegate::paint(QPainter *painter, const QStyleOptionViewItem &opt, const QModelIndex &index) const
{
    if(index.column() == IMAGE_COLUMN_INDEX) {
        QVariant imageData = index.data(Qt::DecorationRole);
        if(imageData.isValid()) {
            QImage image;
            QByteArray byteArray = imageData.toByteArray();
            image.fromData(imageData.toByteArray());
            QApplication::style()->drawItemPixmap(painter, opt.rect, Qt::AlignHCenter, QPixmap::fromImage(image));
        }
    }

    QStyledItemDelegate::paint(painter, opt, index);

}

QWidget *StudentItemDelegate::createEditor(QWidget *parent, const QStyleOptionViewItem &option, const QModelIndex &index) const
{
	Q_UNUSED(option)
    return StudentItemDelegate::createEditor(parent, option, index);
}

void StudentItemDelegate::setEditorData(QWidget *editor, const QModelIndex &index) const
{
    // TODO: write code
    StudentItemDelegate::setEditorData(editor, index);
}

void StudentItemDelegate::setModelData(QWidget *editor, QAbstractItemModel *model, const QModelIndex &index) const
{
    // TODO: write code
    QStyledItemDelegate::setModelData(editor, model, index);
}

QSize StudentItemDelegate::sizeHint(const QStyleOptionViewItem &option, const QModelIndex &index) const
{
    // TODO: write code
	return QStyledItemDelegate::sizeHint(option, index);
}

