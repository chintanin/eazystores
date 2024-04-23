exports.createStore = async (req, res) => {
  try {
    const { name, storeName, number, area  } = req.body;
    const db = require("../config/firebaseConfig");

    const snapshot = await db.ref("Eazystores/stores/").once("value");
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

    const uuserId = db.ref("Eazystores/stores").push().key;

    await db.ref(`Eazystores/stores/${uuserId}`).set({
      name: name,
      storeName: storeName,
      number: number,
      area: "Kaggadasapura",
    });

    return res.status(200).json({ message: "Success" });
  } catch (e) {
    console.error("Error in creating store user", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.storesCaptureTooManySendOtpAttempts = async (req, res) => {
  try {
    const { number, dateTime } = req.body;
    const db = require("../config/firebaseConfig");

    const uuserId = db
      .ref("Eazystores/stores/Multiple_Send_Otp_Attempts")
      .push().key;

    await db.ref(`Eazystores/stores/Multiple_Send_Otp_Attempts/${uuserId}`).set({
      number: number,
      dateTime_tried: dateTime,
    });

    return res.status(204).send();
  } catch (e) {
    console.error("Error in creating store", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
