'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('drinks', [
            {
                name: 'Beer',
                image: 'https://res.cloudinary.com/dzsj9xnd2/image/upload/v1687780032/garmsa3wxg7gbtwa4v6s.svg',
                price: 90,
                desciption: 'รู้สึกคอแห้ง เยี่ยวแตกก็ไม่เป็นไร',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'Midori Sour',
                image: 'https://res.cloudinary.com/dzsj9xnd2/image/upload/v1687780067/teo4i2mu9zqajxq92djq.svg',
                price: 120,
                desciption: 'เปรี้ยวจี๊ด ปี๊ดซ่า',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'Red wine',
                image: 'https://res.cloudinary.com/dzsj9xnd2/image/upload/v1687780216/qyf3granndtuoxbrfg1d.svg',
                price: 300,
                desciption: 'ลงรูปดื่มไวน์ ชีวิตจริงแดกเอ็มร้อย',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'On the rock',
                image: 'https://res.cloudinary.com/dzsj9xnd2/image/upload/v1687780473/to4wxhyrzucpfj21ye4f.svg',
                price: 220,
                desciption: 'ออนเดอะล็อค น็อคเดอะสเตจ',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'Blue Hawaii',
                image: 'https://res.cloudinary.com/dzsj9xnd2/image/upload/v1687780500/af1uyh0qoumyvaqg8qav.svg',
                price: 40,
                desciption: 'บลูฮาวาย จบ',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'Magarita',
                image: 'https://res.cloudinary.com/dzsj9xnd2/image/upload/v1687780724/hxksaitmxgbbnqnlel6s.svg',
                price: 330,
                desciption: 'ซิญญอริต้า มาการิต้้า กิกี้กาก้า',
                created_at: new Date(),
                updated_at: new Date(),
            },
        ])
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
}
