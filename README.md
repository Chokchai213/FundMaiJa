# web-programming

## Project description

FUNDMAIJA เป็น Web Application สำหรับการให้ข้อมูลเกี่ยวกับการลงทุนในกองทุนที่อยู่ภายใต้บริษัท หลักทรัพย์จัดการกองทุน ไทยพาณิชย์ จำกัด (SCBAM) และใช้สำหรับติดตามข่าวสารเกี่ยวกับการลงทุน  

## Features of the application

- Confirm accout by email: เป็นระบบที่จะต้องทำการยืนยันตัวใน email ก่อนถึงจะสามารถ signin เข้าสู่ระบบได้
- News feed: เป็นหน้าที่จะนำเสนอข่าวสารเกี่ยวกับการลงทุน
- Favourite fund: เป็นระบบที่สามารถเพิ่มหรือลดกองทุนที่ชอบได้ แล้ะยังสามารถ download ข้อมูลของ favourite fund ลงมาเป็น file csv ได้
- Search fund: สามารถ search หาข้อมูลเกี่ยวกับกองทุนได้

## Brief design note

- Responsive design: มีความยืดหยุ่นในการปรับขนาดหน้าจอแสดงผล
- Navigation: ง่ายต่อการ navigate ไปยังหน้าต่างๆ โดยใช้ navigation bar
- Information accessibility: สามารถเข้าถึงข้อมูลของกองทุนที่อยู่ในระบบได้ทั้งหมด
- Content: ข้อมูลภายในแอปพลิเคชันง่ายต่อผู้ใช้ในการหาข้อมูล และมีการแสดงผลข้อมูลอย่างชัดเจน

## References

- Innovest X: https://www.innovestx.co.th/home?utm_source=googleads&utm_medium=click&utm_campaign=sem&utm_content=brand&gad_source=1&gclid=Cj0KCQjw6PGxBhCVARIsAIumnWYQNgw3Ttd43ITNHjPaO_a-6xXW_KMy0yn0XsX3_m7dZwwMgKGyevgaAt7MEALw_wcB
- SCBAM: https://www.scbam.com/th/fund/interesting-fund/all-time/risk-level/asc
- SEC: https://market.sec.or.th/public/mrap/MRAPDefault.aspx

## Presentation slide

- https://www.canva.com/design/DAGEvSA3ADU/FuwXMGEa3miQuNkRyyxp5A/edit?utm_content=DAGEvSA3ADU&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton

## Github link

- https://github.com/taro54071/Group01_fundmaija

## Video demo

- https://drive.google.com/file/d/10Kq7b1rmK4aHUBwZ61b7jbZ9bHWTH_Gm/view?usp=sharing

## env file (frontend)

Please create .env file in the root of frontend folder before running our app. Here is the config.

- VITE_NEWS_APIKEY = def80b5a5f0544648110a0a7c23d4f85

## env file (backend)

Please create .env file in the root of backend folder before running our app. Here is the config.

- MONGODB_URL = mongodb+srv://helloworld:egco427webpro@helloworld.soxbhsy.mongodb.net/projectdb?retryWrites=true&w=majority
- PORT = 3000
- SECRET_ACCESS_TOKEN = xzGK3nv4UsCq2GDPu1odGqlIdB6C36Rz
- OCP_API = 9ef8ff9b276b46a38fc9c90d06a1fdd1
- SCB_ID = C0000000239
- EMAIL = "web.programming2024@gmail.com"
- PASSWORD = "kzyo jeja kuue lbyq"