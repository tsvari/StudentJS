#ifndef ASYNCIMAGELOADER_H
#define ASYNCIMAGELOADER_H

#include <QObject>
#include <QUrl>
#include <QImage>

class AsyncImageLoader : public QObject
{
    Q_OBJECT
public:
    explicit AsyncImageLoader(QObject *parent, const QUrl &url, const QString& imageName);
    void loadImage();
    QImage image() { return m_image; }

signals:
    void imageLoadFinished();

private:
    QUrl m_imageUrl;
    QImage m_image;
    QString m_imageName;
};

#endif // ASYNCIMAGELOADER_H
