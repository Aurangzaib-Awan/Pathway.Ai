document.addEventListener("DOMContentLoaded", () => {
    const forgotPasswordForm = document.getElementById("forgotPasswordForm")
    const emailInput = document.getElementById("email")
    const newPasswordInput = document.getElementById("newPassword")
    const confirmPasswordInput = document.getElementById("confirmPassword")
    const emailError = document.getElementById("emailError")
    const newPasswordError = document.getElementById("newPasswordError")
    const confirmPasswordError = document.getElementById("confirmPasswordError")
    const resetError = document.getElementById("resetError")
    const resetSuccess = document.getElementById("resetSuccess")
  
    // Form submission
    forgotPasswordForm.addEventListener("submit", (e) => {
      e.preventDefault()
  
      // Reset error messages
      emailError.style.display = "none"
      newPasswordError.style.display = "none"
      confirmPasswordError.style.display = "none"
      resetError.style.display = "none"
      resetSuccess.style.display = "none"
  
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
  
      // Validate new password
      if (!newPasswordInput.value.trim()) {
        newPasswordError.textContent = "New password is required"
        newPasswordError.style.display = "block"
        isValid = false
      } else if (newPasswordInput.value.length < 6) {
        newPasswordError.textContent = "Password must be at least 6 characters"
        newPasswordError.style.display = "block"
        isValid = false
      }
  
      // Validate confirm password
      if (newPasswordInput.value !== confirmPasswordInput.value) {
        confirmPasswordError.textContent = "Passwords do not match"
        confirmPasswordError.style.display = "block"
        isValid = false
      }
  
      if (isValid) {
        // Check if user exists
        const users = JSON.parse(localStorage.getItem("pathwayUsers") || "[]")
        const userIndex = users.findIndex((u) => u.email === emailInput.value.trim())
  
        if (userIndex === -1) {
          resetError.textContent = "No account found with this email address"
          resetError.style.display = "block"
          return
        }
  
        // Update user password
        users[userIndex].password = newPasswordInput.value
        localStorage.setItem("pathwayUsers", JSON.stringify(users))
  
        // Show success message
        resetSuccess.textContent = "Password reset successfully! Redirecting to login..."
        resetSuccess.style.display = "block"
  
        // Clear form
        forgotPasswordForm.reset()
  
        // Redirect to login page after a short delay
        setTimeout(() => {
          window.location.href = "login.html"
        }, 2000)
      }
    })
  
    // Email validation helper function
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    }
  })
  
  
