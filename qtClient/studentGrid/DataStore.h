#ifndef DATASTORE_H
#define DATASTORE_H

#include <QObject>
#include "JsonDataObject.h"
class QNetworkReply;
class MainWindow;

class DataStore : public QObject
{
	Q_OBJECT
public:
	DataStore* instance();
	QList<Student>& jsonStudentArray(){return m_jsonStudentArray;}
	friend MainWindow;
public slots:
	void replyToSelectFinished(QNetworkReply *reply);
private:
	explicit DataStore(QObject* parent = nullptr);
	static DataStore* m_instance;
	QList<Student>  m_jsonStudentArray;
};



#endif // DATASTORE_H
