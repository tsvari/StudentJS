#include "DataStore.h"
#include "mainwindow.h"

#include <QNetworkAccessManager>
#include <QNetworkReply>
#include <QJsonDocument>
#include <QDebug>
#include <QModelIndex>  

#include "AsyncImageLoader.h"

DataStore* DataStore::m_instance = nullptr;
DataStore::DataStore(QObject* parent) : QObject(parent)
{
	m_instance = this;
}

QImage DataStore::image(int row)
{
	if(m_jsonStudentArray.size()<=row) {
		return {};
	}
	const QString imageName = m_jsonStudentArray.at(row).imageName;
	if(!m_imageMap.contains(imageName)) {
		return {};
	}
	return m_imageMap[imageName]->image();
}

int DataStore::indexOfImage(const QString &imageName)
{
    for(int i = 0; i < m_jsonStudentArray.size(); i++) {
        const Student& st = m_jsonStudentArray.at(i);
        if(st.imageName == imageName) {
            return i;
        }
    }
	return -1;
}

bool DataStore::update(const QModelIndex &index, const QVariant &value)
{
	if(!index.isValid() || index.row() >= m_jsonStudentArray.size() || index.column() >1) {
		return false;
	}

	Student student = m_jsonStudentArray.at(index.row());
	if(index.column() == 0) {
		student.uid = value.toInt();
	} else if(index.column() == 1) {
		student.name = value.toString();
	}

	m_jsonStudentArray.replace(index.row(), student);
}

void DataStore::replyToSelectFinished(QNetworkReply *reply)
{
	QString str = reply->readAll();

    if(str.isEmpty()) {
        emit refreshed(false);
        return;
    }
    //clean arrays here
    m_jsonStudentArray.clear();
    for(auto asyncImageObject: m_imageMap.keys()) {
       delete m_imageMap.value(asyncImageObject);
    }
    m_imageMap.clear();

	QJsonDocument loadDoc(QJsonDocument::fromJson(str.toUtf8()));
	QJsonArray jsonObjectArray = loadDoc.array();

    for(QJsonValue jsonValue: jsonObjectArray) {
        QJsonObject js = jsonValue.toObject();
        Student st(js);
        m_jsonStudentArray.push_back(st);

		QUrl url("http://127.0.0.1:8082/?type=data&img=" + st.imageName);

        AsyncImageLoader* imgLoader = new AsyncImageLoader(this, url, st.imageName);
        imgLoader->loadImage();
        m_imageMap.insert(st.imageName, imgLoader);

        qDebug()<<"replyToSelectFinished and emit refreshed(true) - "<<st.imageName;
	}
    emit refreshed(true);
}
