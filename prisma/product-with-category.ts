import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const getRandom = (max: number, min: number) => {
  return Math.floor(Math.random() * (max - min) + min)
}

const sneakers = [
  {
    name: 'Sneakers 1',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 신발입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://image.msscdn.net/images/goods_img/20190710/1092992/1092992_1_500.jpg',
    price: getRandom(30000, 10000),
  },
  {
    name: 'Sneakers 2',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 신발입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://image.msscdn.net/images/goods_img/20230206/3062046/3062046_16764414088056_500.jpg',
    price: getRandom(30000, 10000),
  },
  {
    name: 'Sneakers 3',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 신발입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://image.msscdn.net/images/goods_img/20200306/1339622/1339622_1_500.jpg',
    price: getRandom(30000, 10000),
  },
  {
    name: 'Sneakers 4',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 신발입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://image.msscdn.net/images/goods_img/20200511/1439535/1439535_16817806443862_500.jpg',
    price: getRandom(30000, 10000),
  },
  {
    name: 'Sneakers 5',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 신발입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://image.msscdn.net/images/goods_img/20170823/607298/607298_1_500.jpg',
    price: getRandom(30000, 10000),
  },
  {
    name: 'Sneakers 6',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 신발입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://image.msscdn.net/images/goods_img/20230131/3049313/3049313_16764360534300_500.jpg',
    price: getRandom(30000, 10000),
  },
  {
    name: 'Sneakers 7',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 신발입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://image.msscdn.net/images/goods_img/20210427/1923286/1923286_1_500.jpg',
    price: getRandom(30000, 10000),
  },
  {
    name: 'Sneakers 8',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 신발입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://image.msscdn.net/images/goods_img/20220530/2589483/2589483_1_500.jpg',
    price: getRandom(30000, 10000),
  },
  {
    name: 'Sneakers 9',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 신발입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://image.msscdn.net/images/goods_img/20190411/1010925/1010925_3_500.jpg',
    price: getRandom(30000, 10000),
  },
  {
    name: 'Sneakers 10',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 신발입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 1,
    image_url:
      'https://image.msscdn.net/images/goods_img/20161122/451851/451851_2_500.jpg',
    price: getRandom(30000, 10000),
  },
]

const tShirt = [
  {
    name: 'T-Shirt 1',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 티셔츠입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 2,
    image_url:
      'https://image.msscdn.net/images/goods_img/20230424/3256931/3256931_16839614861202_big.jpg',
    price: getRandom(30000, 10000),
  },
  {
    name: 'T-Shirt 2',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 티셔츠입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 2,
    image_url:
      'https://image.msscdn.net/images/goods_img/20230424/3256930/3256930_16839614685311_500.jpg',
    price: getRandom(30000, 10000),
  },
  {
    name: 'T-Shirt 3',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 티셔츠입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 2,
    image_url:
      'https://image.msscdn.net/images/goods_img/20230329/3188168/3188168_16849992962259_500.jpg',
    price: getRandom(30000, 10000),
  },
  {
    name: 'T-Shirt 4',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 티셔츠입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 2,
    image_url:
      'https://image.msscdn.net/images/goods_img/20210415/1899755/1899755_1_500.jpg',
    price: getRandom(30000, 10000),
  },
  {
    name: 'T-Shirt 5',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 티셔츠입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 2,
    image_url:
      'https://image.msscdn.net/images/goods_img/20230223/3105468/3105468_16780674434582_500.jpg',
    price: getRandom(30000, 10000),
  },
  {
    name: 'T-Shirt 6',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 티셔츠입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 2,
    image_url:
      'https://image.msscdn.net/images/goods_img/20220329/2453556/2453556_1_500.jpg',
    price: getRandom(30000, 10000),
  },
  {
    name: 'T-Shirt 7',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 티셔츠입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 2,
    image_url:
      'https://image.msscdn.net/images/goods_img/20220222/2377269/2377269_16777177260753_500.jpg',
    price: getRandom(30000, 10000),
  },
  {
    name: 'T-Shirt 8',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 티셔츠입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 2,
    image_url:
      'https://image.msscdn.net/images/goods_img/20230208/3067178/3067178_16758234087385_500.jpg',
    price: getRandom(30000, 10000),
  },
  {
    name: 'T-Shirt 9',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 티셔츠입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 2,
    image_url:
      'https://image.msscdn.net/images/goods_img/20230316/3155032/3155032_16793874355248_500.jpg',
    price: getRandom(30000, 10000),
  },
  {
    name: 'T-Shirt 10',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 티셔츠입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 2,
    image_url:
      'https://image.msscdn.net/images/goods_img/20230406/3211815/3211815_16807538636960_500.jpg',
    price: getRandom(30000, 10000),
  },
]

const pants = [
  {
    name: 'Pants 1',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 하의입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 3,
    image_url:
      'https://image.msscdn.net/images/goods_img/20200508/1436504/1436504_2_500.jpg',
    price: getRandom(40000, 20000),
  },
  {
    name: 'Pants 2',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 하의입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 3,
    image_url:
      'https://image.msscdn.net/images/goods_img/20220413/2485234/2485234_1_500.jpg',
    price: getRandom(40000, 20000),
  },
  {
    name: 'Pants 3',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 하의입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 3,
    image_url:
      'https://image.msscdn.net/images/goods_img/20210906/2112059/2112059_1_500.jpg',
    price: getRandom(40000, 20000),
  },
  {
    name: 'Pants 4',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 하의입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 3,
    image_url:
      'https://image.msscdn.net/images/goods_img/20180914/858911/858911_6_500.jpg',
    price: getRandom(40000, 20000),
  },
  {
    name: 'Pants 5',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 하의입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 3,
    image_url:
      'https://image.msscdn.net/images/goods_img/20181025/890338/890338_8_500.jpg',
    price: getRandom(40000, 20000),
  },
  {
    name: 'Pants 6',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 하의입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 3,
    image_url:
      'https://image.msscdn.net/images/goods_img/20210812/2060717/2060717_16758407543468_500.jpg',
    price: getRandom(40000, 20000),
  },
  {
    name: 'Pants 7',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 하의입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 3,
    image_url:
      'https://image.msscdn.net/images/goods_img/20210407/1885563/1885563_1_500.jpg',
    price: getRandom(40000, 20000),
  },
  {
    name: 'Pants 8',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 하의입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 3,
    image_url:
      'https://image.msscdn.net/images/goods_img/20220516/2562527/2562527_1_500.jpg',
    price: getRandom(40000, 20000),
  },
  {
    name: 'Pants 9',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 하의입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 3,
    image_url:
      'https://image.msscdn.net/images/goods_img/20210714/2028326/2028326_2_500.jpg',
    price: getRandom(40000, 20000),
  },
  {
    name: 'Pants 10',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 하의입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 3,
    image_url:
      'https://image.msscdn.net/images/goods_img/20200818/1552753/1552753_1_500.jpg',
    price: getRandom(40000, 20000),
  },
]

const cap = [
  {
    name: 'Cap 1',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 모자입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 4,
    image_url:
      'https://image.msscdn.net/images/goods_img/20230321/3166516/3166516_16825770982324_500.jpg',
    price: getRandom(30000, 10000),
  },
  {
    name: 'Cap 2',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 모자입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 4,
    image_url:
      'https://image.msscdn.net/images/goods_img/20211223/2280117/2280117_1_500.jpg',
    price: getRandom(30000, 10000),
  },
  {
    name: 'Cap 3',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 모자입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 4,
    image_url:
      'https://image.msscdn.net/images/goods_img/20210419/1907733/1907733_1_500.jpg',
    price: getRandom(30000, 10000),
  },
  {
    name: 'Cap 4',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 모자입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 4,
    image_url:
      'https://image.msscdn.net/images/goods_img/20191105/1214174/1214174_9_500.jpg',
    price: getRandom(30000, 10000),
  },
  {
    name: 'Cap 5',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 모자입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 4,
    image_url:
      'https://image.msscdn.net/images/goods_img/20220213/2356713/2356713_2_500.jpg',
    price: getRandom(30000, 10000),
  },
  {
    name: 'Cap 6',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 모자입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 4,
    image_url:
      'https://image.msscdn.net/images/goods_img/20191105/1214193/1214193_4_big.jpg',
    price: getRandom(30000, 10000),
  },
  {
    name: 'Cap 7',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 모자입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 4,
    image_url:
      'https://image.msscdn.net/images/goods_img/20210910/2123132/2123132_1_500.jpg',
    price: getRandom(30000, 10000),
  },
  {
    name: 'Cap 8',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 모자입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 4,
    image_url:
      'https://image.msscdn.net/images/goods_img/20210419/1906772/1906772_1_500.jpg',
    price: getRandom(30000, 10000),
  },
  {
    name: 'Cap 9',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 모자입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 4,
    image_url:
      'https://image.msscdn.net/images/goods_img/20230407/3215644/3215644_16843971653021_500.jpg',
    price: getRandom(30000, 10000),
  },
  {
    name: 'Cap 10',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 모자입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 4,
    image_url:
      'https://image.msscdn.net/images/goods_img/20230407/3215598/3215598_16843976835789_500.jpg',
    price: getRandom(30000, 10000),
  },
]

const hoodie = [
  {
    name: 'Hoodie 1',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 후드입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 5,
    image_url:
      'https://image.msscdn.net/images/goods_img/20220125/2326935/2326935_11_500.jpg',
    price: getRandom(40000, 20000),
  },
  {
    name: 'Hoodie 2',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 후드입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 5,
    image_url:
      'https://image.msscdn.net/images/goods_img/20220831/2758254/2758254_3_500.jpg',
    price: getRandom(40000, 20000),
  },
  {
    name: 'Hoodie 3',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 후드입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 5,
    image_url:
      'https://image.msscdn.net/images/goods_img/20210831/2099882/2099882_1_500.jpg',
    price: getRandom(40000, 20000),
  },
  {
    name: 'Hoodie 4',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 후드입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 5,
    image_url:
      'https://image.msscdn.net/images/goods_img/20200924/1622019/1622019_6_500.jpg',
    price: getRandom(40000, 20000),
  },
  {
    name: 'Hoodie 5',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 후드입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 5,
    image_url:
      'https://image.msscdn.net/images/goods_img/20170905/624932/624932_2_500.jpg',
    price: getRandom(40000, 20000),
  },
  {
    name: 'Hoodie 6',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 후드입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 5,
    image_url:
      'https://image.msscdn.net/images/goods_img/20220817/2722805/2722805_16764270486280_500.jpg',
    price: getRandom(40000, 20000),
  },
  {
    name: 'Hoodie 7',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 후드입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 5,
    image_url:
      'https://image.msscdn.net/images/goods_img/20220811/2711880/2711880_21_500.jpg',
    price: getRandom(40000, 20000),
  },
  {
    name: 'Hoodie 8',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 후드입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 5,
    image_url:
      'https://image.msscdn.net/images/goods_img/20230110/3012570/3012570_16765978037622_500.jpg',
    price: getRandom(40000, 20000),
  },

  {
    name: 'Hoodie 9',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 후드입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 5,
    image_url:
      'https://image.msscdn.net/images/goods_img/20230116/3026609/3026609_16740279294962_500.jpg',
    price: getRandom(40000, 20000),
  },
  {
    name: 'Hoodie 10',
    contents:
      '{"blocks":[{"key":"eenda","text":"본 제품은 무신사 후드입니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    category_id: 5,
    image_url:
      'https://image.msscdn.net/images/goods_img/20210723/2038816/2038816_1_500.jpg',
    price: getRandom(40000, 20000),
  },
]

const productData: Prisma.productsCreateInput[] = [
  ...sneakers,
  ...tShirt,
  ...pants,
  ...cap,
  ...hoodie,
]

async function main() {
  await prisma.products.deleteMany({})

  for (const p of productData) {
    const product = await prisma.products.create({
      data: p,
    })
    console.log(`Created id: ${product.id}`)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
