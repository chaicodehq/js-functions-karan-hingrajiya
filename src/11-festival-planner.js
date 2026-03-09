/**
 * 🎉 Festival Countdown Planner - Module Pattern
 *
 * Indian festivals ka planner bana! Module pattern use karna hai —
 * matlab ek function jo ek object return kare jisme public methods hain,
 * lekin andar ka data PRIVATE rahe (bahar se directly access na ho sake).
 *
 * Function: createFestivalManager()
 *
 * Returns an object with these PUBLIC methods:
 *
 *   - addFestival(name, date, type)
 *     date is "YYYY-MM-DD" string, type is "religious"/"national"/"cultural"
 *     Returns new total count of festivals
 *     Agar name empty or date not string or invalid type, return -1
 *     No duplicate names allowed (return -1 if exists)
 *
 *   - removeFestival(name)
 *     Returns true if removed, false if not found
 *
 *   - getAll()
 *     Returns COPY of all festivals array (not the actual private array!)
 *     Each festival: { name, date, type }
 *
 *   - getByType(type)
 *     Returns filtered array of festivals matching type
 *
 *   - getUpcoming(currentDate, n = 3)
 *     currentDate is "YYYY-MM-DD" string
 *     Returns next n festivals that have date >= currentDate
 *     Sorted by date ascending
 *
 *   - getCount()
 *     Returns total number of festivals
 *
 * PRIVATE STATE: festivals array should NOT be accessible from outside.
 *   manager.festivals should be undefined.
 *   getAll() must return a COPY so modifying it doesn't affect internal state.
 *   Two managers should be completely independent.
 *
 * Hint: This is the Module Pattern — a function that returns an object
 *   of methods, all closing over shared private variables.
 *
 * @example
 *   const mgr = createFestivalManager();
 *   mgr.addFestival("Diwali", "2025-10-20", "religious");   // => 1
 *   mgr.addFestival("Republic Day", "2025-01-26", "national"); // => 2
 *   mgr.getAll(); // => [{ name: "Diwali", ... }, { name: "Republic Day", ... }]
 *   mgr.getUpcoming("2025-01-01", 1); // => [{ name: "Republic Day", ... }]
 */
export function createFestivalManager() {
  // Your code here
  // const festivalObjMap = new Map();
  const festivals = [];
  function addFestival(name, date, type) {
    if (typeof name !== "string" || name === "" || typeof date !== "string")
      return -1;

    if (type === "religious" || type === "cultural" || type === "national") {
      let isName = festivals.some((elem) => {
        return elem.name === name;
      });
      if (isName) return -1;
      else festivals.push({ name, date, type });
    } else {
      return -1;
    }

    return festivals.length;
  }

  function removeFestival(name) {
    let idx = -1;
    for (let i = 0; i < festivals.length; i++) {
      if (festivals[i].name === name) idx = i;
      break;
    }
    if (idx !== -1) {
      festivals.splice(idx, 1);
      return true;
    } else {
      return false;
    }
  }

  function getAll() {
    let copyArr = [];
    festivals.forEach((elem) => copyArr.push({ ...elem }));
    return copyArr;
  }

  function getByType(type) {
    return festivals.filter((elem) => elem.type === type);
  }

  function getUpcoming(currentDate, n = 3) {
    let finalArr = festivals
      .filter((elem) => {
        return elem.date >= currentDate;
      })
      .sort((a, b) => {
        return new Date(a.date) - new Date(b.date); //asc order in date
      });

    finalArr.splice(n);
    return finalArr;
  }

  function getCount() {
    return festivals.length;
  }

  return {
    addFestival,
    removeFestival,
    getAll,
    getByType,
    getUpcoming,
    getCount,
  };
}
