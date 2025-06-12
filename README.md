                                     LAUNCH BACKEND:

cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload



                                      LAUNCH FRONTEND:

cd frontend

npm install

npm run dev

go to address http://localhost:3000/


                                        examples of API request

1.Register

POST http://127.0.0.1:8000/register
Body (JSON):
{
  "username": "ddd",
  "password": "ddd"
}

2.Login

POST http://127.0.0.1:8000/login
Body (x-www-form-urlencoded):
username=testuser
password=testpass

3.Create task 

POST http://127.0.0.1:8000/tasks
Headers:
Authorization: Bearer JWT_TOKEN

Body (JSON):
{
  "title": "buy products"
}


4.Delete task 

DELETE http://127.0.0.1:8000/tasks/taskid 
Headers:
Authorization: Bearer JWT_TOKEN


5.Get tasks

GET http://127.0.0.1:8000/tasks
Headers:
Authorization: Bearer <JWT_TOKEN>
