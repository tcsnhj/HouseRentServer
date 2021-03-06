# House Rent Server

The code of extract/parse the house rent information from [duoban](https://www.douban.com/group/beijingzufang/discussion)
Provide the query service for house rent information.
Build by Node.js, run on leancloud.

The House Rent app code: [HouseRent](https://github.com/rolai/HouseRent)

## Run and develop

Install the related packages:

```
npm install
```

Connect to the [leancloud](https://leancloud.cn/) app.

```
lean app add origin <appId>
```

Start the service：

```
lean up
```

Service runs on：[localhost:3000](http://localhost:3000)

## Extract the information manually

Extract the house rent information from douban:

```
node ./local/parser.js
```

Extract the sell information for second hand house or apartments from LinkedHome:

```
node ./local/parseLinkedHome.js
```


## Query the house rent information

### POST  https://leancloud.cn/1.1/functions/query

Request:      
```
{
    "city":  "北京",
    "keyword": "个人",
    "page": 0,
    "pageSize": 10
}
```

`page` and  `pageSize` is optional。 `pageSize` max value is 30.
Currently, the `city` can be one of: 北京、上海、广州、深圳、杭州、成都、武汉。

Request header must include: 

```
X-LC-Id: XXXX, // leancloud appId
X-LC-Key: XXX, // leancloud appkey
X-LC-Prod: 1,
Content-Type: application/json; charset=utf-8

````


Response:
```json
{
    "result": [
        {
            "content": "1，房子位于蒲安西里，走路正常速度7分钟到地铁5号线，5分钟到14号线，附近特别多公交车（运通102、特11、7、525、986、25、39、43、599、685、特12、120、122、723、等等等等），10分钟到三环刘家窑桥、8分钟到二环天坛南门，北京任何角落的通勤都能帮你节省时间\r\n2，房子装修精良，一面墙都做了壁橱，木质地板，你的小窝住着会很舒心\r\n3，房子内所有的电器你想得到用得上都有，冰箱洗衣机还是刚换新的，微波炉电视随便用，燃气不用说肯定有，24小时燃气热水器，洗澡脱衣服的工夫热水就来了。这样的配置住着绝对顺心方便\r\n4，房子不临街，免去车鸣困扰，五楼，开窗户就是大树，空气也好，治安不错，住着放心\r\n5，正规的房子，只住三户，洗澡厕所不用排队，早上也不用为了墙厕所而早起半个小时，住着省心\r\n6，你的室友都是正规上班族，最低学历大学毕业，一个室友经常出差，跟住两户没什么区别。\r\n7，房子是跟个人签，无中介费，提前一个月退房无损坏情况下全额退押金，因为住的舒服我在这里住了五年了都没有搬过家，这样的房子绝对值得你备选\r\n8，诚实的说房子是90年代的装修，但绝对是精装修，所以如果你想住特别新的房子可能满足不了你，但房子重要的不是新旧，而是住的舒不舒服，所以还是建议你来看看~~~\r\n\r\n房子价格为2000元，押一付三，提前一个月退房退押金，希望你是男生，有稳定工作，可以联系我：18611748036，因我经常出差，也可联系13910278001.也可以加我第一个电话微信也可以\r\n\n\n随时来看房哦",
            "city": "北京",
            "source": "bjzf",
            "title": "帅哥福利-双地铁精装修主卧出租-限男生",
            "updateTime": "05-25 18:07",
            "url": "https://www.douban.com/group/topic/64691573/",
            "postTime": "2014-10-25 14:45:33",
            "objectId": "5745799cc26a38006b933f6b",
            "createdAt": "2016-05-25T10:08:28.038Z",
            "updatedAt": "2016-05-25T10:08:28.038Z"
        }
    ]
}
```
