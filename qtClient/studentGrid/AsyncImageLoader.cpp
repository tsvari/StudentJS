#include "AsyncImageLoader.h"
#include <QNetworkAccessManager>
#include <QNetworkReply>
#include <QDebug>

AsyncImageLoader::AsyncImageLoader(QObject *parent, const QUrl &url, const QString& imageName) :
    QObject(parent),
    m_imageUrl(url),
    m_imageName(imageName)
{
}

void AsyncImageLoader::loadImage()
{
    QNetworkAccessManager* netManager = new QNetworkAccessManager(this);
    QNetworkReply* reply = netManager->get(QNetworkRequest(m_imageUrl));

    connect(reply, &QNetworkReply::finished, [=]() {
        if (reply->error() == QNetworkReply::NoError) {
            const int available = reply->bytesAvailable();
            if (available > 0) {
                const QByteArray data(reply->readAll());
                m_image.loadFromData(data);
                qDebug()<<"Image: "<<m_imageName;
                emit imageLoadFinished();
            }
        }
    });
}

