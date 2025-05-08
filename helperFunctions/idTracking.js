import { db } from "./firebase";

var idTrackingArray = [];
/////
function splitCharsAndNumbers(str) {
  // Initialize empty arrays for characters and numbers
  var characters = [];
  var numbers = [];

  // Loop through each character in the string
  for (let char of str) {
    // Check if the character is a number using isNaN (isNaN returns true for non-numeric values)
    if (!isNaN(char)) {
      numbers.push(char);
    } else {
      characters.push(char);
    }
  }

  // Return an array with characters and numbers arrays
  return [characters.join(""), numbers.join("")];
}
////
class IdTracking {
  init(v) {
    idTrackingArray = v;
  }
  calculateNextId = (currentId) => {
    var [chars, numberString] = splitCharsAndNumbers(currentId);
    var number = Number(numberString);
    number++;
    var newNumber = number.toString().padStart(numberString.length, "0");
    var newId = `${chars}${newNumber}`;
    return newId;
  };

  getNextId = (trackingId) => {
    var trackingObject = idTrackingArray.find((trackingObject) => {
      return trackingObject.id == trackingId;
    });
    if (trackingObject) {
      return trackingObject.nextId;
    } else {
      return undefined;
    }
  };
  updateNextId = (trackingId, customNextID) => {
    if (!trackingId) {
      alert("PLEASE PASS TRACKING ID TO FUNCTION updateNextId()")();
      return;
    }
    var trackingObject = idTrackingArray.find((trackingObject) => {
      return trackingObject.id == trackingId;
    });
    if (trackingObject) {
      var [chars, numberString] = splitCharsAndNumbers(trackingObject.nextId);
      var number = Number(numberString);
      number++;
      var newNumber = number.toString().padStart(numberString.length, "0");
      var newId = `${chars}${newNumber}`;
      db.update(
        `idTracking.${trackingId}`,
        {
          lastId: trackingObject.nextId,
          nextId: newId,
        },
        () => {
          console.log(
            `${trackingId} NEXT ID's UPDATED TO-> LAST ID: ${trackingObject.nextId},NEXT ID: ${newId} `
          );
        }
      );
    } else {
      db.add(
        `idTracking.${trackingId}`,
        {
          lastId: "00000",
          nextId: "00001",
        },
        () => {
          console.log(
            `${trackingId} NEXT ID's UPDATED TO-> LAST ID: 0000,NEXT ID: 0001 `
          );
        }
      );
    }
  };
}

export const idTracking = new IdTracking();
