#ifndef JSONDATAOBJECT_H
#define JSONDATAOBJECT_H

#include <QMap>
#include <QVariant>
#include <QJsonValue>
#include <QJsonObject>
#include <QDateTime>
#include <QJsonArray>
#include <QDebug>

class JsonBaseObject
{
protected:
    JsonBaseObject() = default;
    virtual ~JsonBaseObject() = default;

    enum {Read, Write};

    struct varInfo {
        varInfo(){}
        varInfo(void* varAddress, uint16_t type) {
            this->varAddress = varAddress;
            this->type = type;
        }
        void *varAddress;
        uint16_t type;
    };

    void read(QJsonObject &json) {
        for(const QString& key: json.keys()) {
            if(m_map.contains(key)) {
                jsonSerilize(json, key, JsonBaseObject::Read);
            }
        }
    }

    virtual void write(QJsonObject &json) {
        for(const QString& key: m_map.keys()) {
            jsonSerilize(json, key, JsonBaseObject::Write);
        }
    }

	void member(const char* varName, void* member, uint16_t type) {
		m_map[varName] = varInfo(member, type);
	}
	QMap<QString, varInfo>& map(){return m_map;}
	virtual void initmembers() = 0;

private:
	QMap<QString, varInfo> m_map;

    void jsonSerilize(QJsonObject &json, const QString &key, uint option) {
				varInfo info = m_map.value(key);
				QVariant value = json.value(key).toVariant();
				switch(info.type) {
					case QMetaType::Int:
					case QMetaType::UInt:
					case QMetaType::LongLong:
					case QMetaType::ULongLong:
					case QMetaType::Long:
					case QMetaType::ULong:
					case QMetaType::UShort:
                        if(option == Read) {
							if(value.canConvert<int>()) {
								*(static_cast<int*>(info.varAddress)) = value.toInt();
							}
						} else {
							json.insert(key, *(static_cast<int*>(info.varAddress)));
						}
						break;
					case QMetaType::Double:
					case QMetaType::Float:
                        if(option == Read) {
							if(value.canConvert<double>()) {
								*(static_cast<double*>(info.varAddress)) = value.toDouble();
							}
						} else {
							json.insert(key, *(static_cast<double*>(info.varAddress)));
						}
						break;
					case QMetaType::QString:
                        if(option == Read) {
							if(value.canConvert<QString>()) {
								*(static_cast<QString*>(info.varAddress)) = value.toString();
							}
						} else {
							json.insert(key, *(static_cast<QString*>(info.varAddress)));
						}
						break;
					case QMetaType::QStringList:
                        if(option == Read) {
							if(value.canConvert<QStringList>()) {
								*(static_cast<QStringList*>(info.varAddress)) = value.toStringList();
							}
                        } else { // TODO: check this later
                            QStringList list = *(static_cast<QStringList*>(info.varAddress));
                            json.insert(key, QJsonArray::fromStringList(list));
						}
						break;
					case QMetaType::QDateTime:
                        if(option == Read) {
							if(value.canConvert<QDateTime>()) {
								*(static_cast<QDateTime*>(info.varAddress)) = value.toDateTime();
							}
						} else {
							QDateTime dtVl = *(static_cast<QDateTime*>(info.varAddress));
							json.insert(key, dtVl.toString("MM/dd/yyyy hh:mm:ss"));
						}
						break;
					case QMetaType::QDate:
                        if(option == Read) {
							if(value.canConvert<QDate>()) {
								*(static_cast<QDate*>(info.varAddress)) = value.toDate();
							}
						} else {
							QDate dtVl = *(static_cast<QDate*>(info.varAddress));
							json.insert(key, dtVl.toString("MM/dd/yyyy"));
						}
						break;
					case QMetaType::QTime:
                        if(option == Read) {
							if(value.canConvert<QTime>()) {
								*(static_cast<QTime*>(info.varAddress)) = value.toTime();
							}
						} else {
							QTime dtVl = *(static_cast<QTime*>(info.varAddress));
							json.insert(key, dtVl.toString("hh:mm:ss"));
						}
						break;
				default:
                    Q_ASSERT("Wrong meta-type");
					break;
				}
			}
};

class Student : public JsonBaseObject {
public:
	Student(QJsonObject &json) {
		initmembers();
		read(json);
	}
	Student(const Student& st) = default;
    Student(int uid, const QString& name, const QString& imageName) :
		uid(uid),
		name(name),
        imageName(imageName)
	{
		initmembers();
	}

	int uid;
	QString name;
    QString imageName;

protected:
	void initmembers() override {
		member("uid", static_cast<void*>(&uid), QMetaType::Int);
		member("name", static_cast<void*>(&name), QMetaType::QString);
        member("img", static_cast<void*>(&imageName), QMetaType::QString);
	}
};

#endif // JSONDATAOBJECT_H
