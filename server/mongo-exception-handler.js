
const setException = (error) => {

  if(typeof error === 'object' && error.hasOwnProperty('code')){
    // Mongo DB Related Error Code
    const result = ({
      11000: 'Duplicate Email Entries!',
    })[code] ?? "There's is something wrong while inserting data. Please try again!";
    return result;
  }

  // catch other error code;
  return "Error is not related to MongoDB";
}


module.exports = setException;