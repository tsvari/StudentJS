#include "mainwindow.h"
#include "ui_mainwindow.h"
#include "DataStore.h"
#include <QNetworkAccessManager>
#include <QNetworkReply>

MainWindow::MainWindow(QWidget *parent)
	: QMainWindow(parent)
	, ui(new Ui::MainWindow)
{
	ui->setupUi(this);
/*
	QString RDKey = "XXXXXXXXXXXXXXXX";
	QString WRKey = "XXXXXXXXXXXXXXXX";
	QString CHKey = "XXXXXXXXXXXXXXXX";
	QString CHNum = "xxxxxx";

	QVariantMap feed;
	feed.insert("uid",WRKey);
	feed.insert("name",QVariant(tval).toString());
	feed.insert("phone",QVariant(hval).toString());
	feed.insert("img",Qvariant(pval).toString());
	QByteArray payload=QJsonDocument::fromVariant(feed).toJson();

	QNetworkRequest request;
	request.setUrl(QUrl("http://127.0.0.1:8388/"));
	request.setHeader(QNetworkRequest::ContentTypeHeader, "application/json");

	QNetworkAccessManager *restclient = new QNetworkAccessManager(this); //constructor
	QNetworkReply *reply = restclient->post(request, payload);
	qDebug() << reply->readAll();
	*/
	DataStore* dataSore = new DataStore(this);
	QNetworkAccessManager *manager = new QNetworkAccessManager(this);
	connect(manager, &QNetworkAccessManager::finished,
			dataSore, &DataStore::replyToSelectFinished);

	manager->get(QNetworkRequest(QUrl("http://127.0.0.1:8388/")));
}

MainWindow::~MainWindow()
{
	delete ui;
}



