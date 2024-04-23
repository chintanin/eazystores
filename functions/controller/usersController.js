exports.createUser = async (req, res) => {
  try {
    const { name, number, gender } = req.body;
    const db = require("../config/firebaseConfig");

    const snapshot = await db.ref("Eazystores/users/").once("value");
    const users = snapshot.val();

    let numberExists = false;

    if (users) {
      Object.values(users).forEach((user) => {
        if (user.number === number) {
          numberExists = true;
        }
      });
    }

    if (numberExists) {
      return res.status(400).json({ message: "Number already exists" });
    }

    const uuserId = db.ref("Eazystores/users").push().key;

    await db.ref(`Eazystores/users/${uuserId}`).set({
      name: name,
      number: number,
      gender: gender,
      Area: "Kaggadasapura",
    });

    return res.status(200).json({ message: "Success" });
  } catch (e) {
    console.error("Error in creating user", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.captureTooManySendOtpAttempts = async (req, res) => {
  try {
    const { number, dateTime } = req.body;
    const db = require("../config/firebaseConfig");

    const uuserId = db
      .ref("Eazystores/users/Multiple_Send_Otp_Attempts")
      .push().key;

    await db.ref(`Eazystores/users/Multiple_Send_Otp_Attempts/${uuserId}`).set({
      number: number,
      dateTime_tried: dateTime,
    });

    return res.status(204).send();
  } catch (e) {
    console.error("Error in creating user", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
