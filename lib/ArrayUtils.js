export const alphabetizeForSections = (rawData, key) => {
  // Since data at this point is an object, to get array of values
  // we use Object.values method
  return Object.values(
    rawData
      // Order by provided key all objects in the array
      .sort(function (a, b) {
        // Ensure function is not case sensitive
        const keyA = a[key].toUpperCase();
        const keyB = b[key].toUpperCase();
        // Order by provided key
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      })
      // Group by first letter
      .reduce((r, e) => {
        // Get first letter of name of current element
        let title = e[key][0];
        // If there is no property in accumulator with this letter create it
        if (!r[title]) r[title] = { title, data: [e] };
        // If there is push current element to data array for that letter
        else r[title].data.push(e);
        // Return accumulator
        return r;
      }, {})
  );
};
