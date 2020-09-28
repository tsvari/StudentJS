#ifndef DATASTORE_H
#define DATASTORE_H

#include <QObject>
#include "JsonDataObject.h"
#include "AsyncImageLoader.h"

namespace {
	const int ImageColumnIndex = 2;

	enum EditMode{Insert = 0, Update = 1};
}

class QNetworkReply;
class MainWindow;
class QImage;

class DataStore : public QObject
{
	Q_OBJECT
public:
    static DataStore* instance() { return m_instance; }

	inline int size() {return m_jsonStudentArray.size();}
	inline Student student(int row) {return m_jsonStudentArray.at(row);}
	inline QMap<QString, AsyncImageLoader*>& imageMap() {return m_imageMap;}
	inline QList<Student>& studentList() { return m_jsonStudentArray; }

	QImage image(int row);
	int indexOfImage(const QString& imageName);

	bool update(const QModelIndex &index, const QVariant &value);
	void append(){m_jsonStudentArray.push_back(Student(-1,"",""));}
	void remove(int row){m_jsonStudentArray.removeAt(row);}

    friend class MainWindow;

public slots:
	void replyToSelectFinished(QNetworkReply *reply);

signals:
    void refreshed(bool success);
    void asyncImageLoadFinished(int row);

private:
	explicit DataStore(QObject* parent = nullptr);

	static DataStore* m_instance;

    QList<Student>  m_jsonStudentArray;
    QMap<QString, AsyncImageLoader*> m_imageMap;
};



#endif // DATASTORE_H
