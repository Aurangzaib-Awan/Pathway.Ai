document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm")
    const emailInput = document.getElementById("email")
    const passwordInput = document.getElementById("password")
    const emailError = document.getElementById("emailError")
    const passwordError = document.getElementById("passwordError")
    const loginError = document.getElementById("loginError")
    const loginSuccess = document.getElementById("loginSuccess")
  
    // Form validation
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()
  
      // Reset error messages
      emailError.style.display = "none"
      passwordError.style.display = "none"
      loginError.style.display = "none"
      loginSuccess.style.display = "none"
  
      let isValid = true
  
      // Validate email
      if (!emailInput.value.trim()) {
        emailError.textContent = "Email is required"
        emailError.style.display = "block"
        isValid = false
      } else if (!isValidEmail(emailInput.value)) {
        emailError.textContent = "Please enter a valid email address"
        emailError.style.display = "block"
        isValid = false
      }
  
      // Validate password
      if (!passwordInput.value.trim()) {
        passwordError.textContent = "Password is required"
        passwordError.style.display = "block"
        isValid = false
      }
  
      if (isValid) {
        // Attempt login
        const users = JSON.parse(localStorage.getItem("pathwayUsers") || "[]")
        const user = users.find((u) => u.email === emailInput.value.trim())
  
        if (user && user.password === passwordInput.value) {
          // Successful login
          loginSuccess.textContent = "Login successful! Redirecting..."
          loginSuccess.style.display = "block"
  
          // Store logged in user
          localStorage.setItem(
            "currentUser",
            JSON.stringify({
              email: user.email,
              name: user.name,
            }),
          )
  
          // Redirect to home page after a short delay
          setTimeout(() => {
            window.location.href = "index.html"
          }, 1500)
        } else {
          // Failed login
          loginError.textContent = "Invalid email or password"
          loginError.style.display = "block"
        }
      }
    })
  
    // Email validation helper function
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    }
  })
  
  
