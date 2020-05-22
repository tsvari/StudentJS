#include "DataStore.h"
#include "mainwindow.h"
#include <QNetworkAccessManager>
#include <QNetworkReply>
#include <QJsonDocument>

DataStore* DataStore::m_instance = nullptr;
DataStore::DataStore(QObject* parent) : QObject(parent)
{
	m_instance = this;
}

DataStore *DataStore::instance()
{
	return m_instance;
}

void DataStore::replyToSelectFinished(QNetworkReply *reply)
{
	QString str = reply->readAll();
	qDebug() << str;
	QJsonDocument loadDoc(QJsonDocument::fromJson(str.toUtf8()));
	QJsonArray jsonObjectArray = loadDoc.array();
	for(QJsonValue jsonValue: jsonObjectArray) {
		QJsonObject js = jsonValue.toObject();
		m_jsonStudentArray.push_back(Student(js));
	}

	//Student st2(178, "New", "neImage.png");
	//QJsonObject newJson;
	//st2.write(newJson);
	//jsonObjectArray.append(newJson);
	//qDebug() << jsonObjectArray;
}
