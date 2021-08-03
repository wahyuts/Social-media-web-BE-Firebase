// Validasi tulisan format email sudah benar apa belum
const isEmail = (email) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email.match(regex)) return true;
    else return false;
  }
  
  // 
  const isEmpty = (string) => {
    if(string.trim() === '') return true;
    else return false;
  }

  exports.validateSignupData = (data) => {
      //Validate form empty or not
  
    let errors = {};
  
    if(isEmpty(data.email)){
      errors.email = "Email must not be empty"
    } else if(!isEmail(data.email)){
      errors.email = "Must be a valid email address"
    }
  
    if(isEmpty(data.password)){
      errors.password = "Password must not be empty"
    }
  
    if(data.password !== data.confirmPassword) {
      errors.confirmPassword = "Password must match"
    }
  
    if(isEmpty(data.handle)){
      errors.handle = "handle must not be empty"
    }

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
  }

  exports.validateSigninData = (data) => {
    let errors = {};
  
    if(isEmpty(user.email)){
      errors.email = "email must not be empty"
    }
  
    if(isEmpty(user.password)){
      errors.password = "password must not be empty"
    }
  
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
  }