#ifndef DATASTORE_H
#define DATASTORE_H

#include <QObject>
#include "JsonDataObject.h"
#include "AsyncImageLoader.h"

namespace {
    const int IMAGE_COLUMN_INDEX = 2;
}

class QNetworkReply;
class MainWindow;
class QImage;

class DataStore : public QObject
{
	Q_OBJECT
public:
    static DataStore* instance() { return m_instance; }
    QList<Student>& studentList() { return m_jsonStudentArray; }
    QImage image(int row);
    int indexOfImage(const QString& imageName);
    int size() {return m_jsonStudentArray.size();}
    Student student(int row) {return m_jsonStudentArray.at(row);}
    //AsyncImageLoader* asyncImage(const QString& imageName) {return m_imageMap[imageName];}
    QMap<QString, AsyncImageLoader*>& imageMap() {return m_imageMap;}

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
