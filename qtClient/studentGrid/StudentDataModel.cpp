#include "StudentDataModel.h"

StudentDataModel::StudentDataModel(QObject *parent)
	: QAbstractTableModel(parent)
{
}

QVariant StudentDataModel::headerData(int section, Qt::Orientation orientation, int role) const
{
	// FIXME: Implement me!
	return {};
}

bool StudentDataModel::setHeaderData(int section, Qt::Orientation orientation, const QVariant &value, int role)
{
	if (value != headerData(section, orientation, role)) {
		// FIXME: Implement me!
		emit headerDataChanged(orientation, section, section);
		return true;
	}
	return false;
}


int StudentDataModel::rowCount(const QModelIndex &parent) const
{
	if (parent.isValid())
		return 0;

	// FIXME: Implement me!
}

int StudentDataModel::columnCount(const QModelIndex &parent) const
{
	if (parent.isValid())
		return 0;

	// FIXME: Implement me!
}

QVariant StudentDataModel::data(const QModelIndex &index, int role) const
{
	if (!index.isValid())
		return QVariant();

	// FIXME: Implement me!
	return QVariant();
}

bool StudentDataModel::setData(const QModelIndex &index, const QVariant &value, int role)
{
	if (data(index, role) != value) {
		// FIXME: Implement me!
		emit dataChanged(index, index, QVector<int>() << role);
		return true;
	}
	return false;
}

Qt::ItemFlags StudentDataModel::flags(const QModelIndex &index) const
{
	if (!index.isValid())
		return Qt::NoItemFlags;

	return Qt::ItemIsEditable; // FIXME: Implement me!
}

bool StudentDataModel::insertRows(int row, int count, const QModelIndex &parent)
{
	beginInsertRows(parent, row, row + count - 1);
	// FIXME: Implement me!
	endInsertRows();

	return true;
}

bool StudentDataModel::removeRows(int row, int count, const QModelIndex &parent)
{
	beginRemoveRows(parent, row, row + count - 1);
	// FIXME: Implement me!
	endRemoveRows();

	return true;
}


