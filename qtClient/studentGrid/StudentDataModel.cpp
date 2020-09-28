#include "StudentDataModel.h"
#include "DataStore.h"


StudentDataModel::StudentDataModel(DataStore* dataStore, QObject *parent)
    : QAbstractTableModel(parent),
	  _dataStore(dataStore)
{
}

QVariant StudentDataModel::headerData(int section, Qt::Orientation orientation, int role) const
{
    if (role == Qt::DisplayRole){
        if (orientation == Qt::Horizontal) {
            switch(section) {
            case 0:
                return "Uid";
                break;
            case 1:
                return "Name";
                break;
			case ImageColumnIndex:
                return "Image";
                break;
            }
		} else if (orientation == Qt::Vertical) {
			return section + 1;
		}
    }
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

	return _dataStore->studentList().size();
}

int StudentDataModel::columnCount(const QModelIndex &parent) const
{
	if (parent.isValid())
		return 0;

    return 3;
}

QVariant StudentDataModel::data(const QModelIndex &index, int role) const
{
	if (!index.isValid())
        return {};

	if(index.row() >= _dataStore->size() || index.row() < 0) {
		return {};
	}

	Student st = _dataStore->student(index.row());
	switch(role) {
		case Qt::EditRole:
		case Qt::DisplayRole: {
			switch(index.column()) {
				case 0:
					return st.uid;
					break;
				case 1:
					return st.name;
					break;
				}
			}
			break;
		case Qt::DecorationRole:
			if(index.column() == ImageColumnIndex) {
				QImage image = _dataStore->image(index.row());
				if(!image.isNull()) {
					return _dataStore->image(index.row());
				}
			}
			break;
		}

    return {};
}

bool StudentDataModel::setData(const QModelIndex &index, const QVariant &value, int role)
{
	if (data(index, role) != value) {
		_dataStore->update(index, value);
		return true;
	}
	return false;
}

Qt::ItemFlags StudentDataModel::flags(const QModelIndex &index) const
{
	if (!index.isValid())
		return Qt::NoItemFlags;

    return Qt::ItemIsSelectable | Qt::ItemIsEnabled; // Qt::ItemIsEditable | Qt::ItemIsDropEnabled | Qt::ItemIsDragEnables
}

bool StudentDataModel::insertRows(int row, int count, const QModelIndex &parent)
{
	beginInsertRows(parent, row, row + count - 1);
		_dataStore->append();
	endInsertRows();

	return true;
}

bool StudentDataModel::removeRows(int row, int count, const QModelIndex &parent)
{
	beginRemoveRows(parent, row, row + count - 1);
		_dataStore->remove(row);
	endRemoveRows();

	return true;
}



