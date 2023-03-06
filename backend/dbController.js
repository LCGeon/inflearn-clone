const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("db/main.db", (err) => {
  if (err) {
    console.error(err.message);
  }
});

module.exports.getUserInfo = (id, password) => {
  return new Promise((resolve, reject) => {
    db.get(
      `select * from member
                where id = "${id}"
                and password = "${password}"`,
      [],
      (err, row) => {
        if (err) {
          reject("DB에러");
        }
        if (!row) {
          reject("없는 회원");
        }
        resolve(row);
      }
    );
  });
};

module.exports.insertUser = (id, password, type) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO member(id,password,type) VALUES("${id}","${password}",${type})`,
      [],
      (err) => {
        if (err) {
          reject("DB error");
        }
      }
    );
    resolve(true);
  });
};

module.exports.insertLecture = (
  title,
  context,
  videoUrl,
  price,
  imageUrl,
  user
) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO lecture(title,context,video_url,price,image_url,user)
      VALUES("${title}","${context}","${videoUrl}",${price},"${imageUrl}","${user}")`,
      [],
      (err) => {
        if (err) {
          console.log(err);
          reject("DB error");
        }
        resolve(true);
      }
    );
  });
};

module.exports.getLectureList = () => {
  return new Promise((resolve, reject) => {
    db.all(`select * from lecture`, [], (err, rows) => {
      if (err) {
        reject("DB에러");
      }
      resolve(rows);
    });
  });
};

module.exports.getUserLectureList = (userId) => {
  return new Promise((resolve, reject) => {
    db.all(
      `select lecture_id as lectureId
        from student_courses
        where user_id = ${userId};`,
      [],
      (err, rows) => {
        if (err) {
          reject("DB error");
        }
        resolve(rows);
      }
    );
  });
};

module.exports.addEnrolment = (userId, lectureId) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO student_courses (user_id, lecture_id)
        VALUES (${userId}, ${lectureId});`,
      [],
      (err) => {
        if (err) {
          reject("DB error");
        }

        this.getUserLectureList(userId).then((lectureList) => {
          resolve(lectureList);
        });
      }
    );
  });
};
