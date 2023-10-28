<script setup>

</script>

<template>
  <div class="section">
    <div class="container d-flex justify-content-center">
      <div class="form-box">
        <div class="form-value">
          <form method="POST" name="Login" role="form">
            <h2 class="serifFont">Sign In</h2>
            <div class="inputbox">
              <!--              <ion-icon name="person-outline"></ion-icon>-->
              <input id="username" name="username" required
                     type="text" value="">
              <label for="usernames">Username</label>
            </div>
            <div class="inputbox">
              <!--              <ion-icon name="lock-closed-outline"></ion-icon>-->
              <input id="password" name="password" required type="password">
              <label for="password">Password</label>
            </div>
            <div class="forget">
              <label for=""><input type="checkbox">Remember Me </label>
              <a href="#">Forget Password</a>
            </div>
            <button class="button">login</button>
          </form>
          <!--            <div class="register">-->
          <!--              <p>Don't have a account ? //Register</p>-->
          <!--            </div>-->
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  width: 100%;
}

.form-box {
  position: relative;
  width: 450px;
  height: 80vh;
  padding: 10px;
  /* background: transparent; */
  background: rgba(255, 255, 255, 0.55);
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  backdrop-filter: blur(15px);
  display: flex;
  justify-content: center;
  align-items: center;
//border: var(--primary-color) solid 2px;

}

h2 {
  font-size: 3em;
  color: var(--text-color);
  text-align: center;
}

.inputbox {
  position: relative;
  margin: 30px 0;
  width: 310px;
  border-bottom: 2px solid var(--text-color);
}

.inputbox label {
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  color: var(--text-color);
  /* color: #9966FF; */
  font-size: 1.1rem !important;
  pointer-events: none;
  transition: .5s;

}

input:focus ~ label,
input:valid ~ label {
  top: -5px;
}

.inputbox input {
  width: 100%;
  height: 50px;
  background: transparent;
  border: none;
  outline: none;
  font-size: 1em;
  padding: 0 35px 0 5px;
  color: var(--text-color);
  font-family: var(--sans-font);
  left: 25px;
  position: relative;
}

.inputbox ion-icon {
  position: absolute;
  left: 0px;
  color: var(--text-color);
  font-size: 1.2em;
  top: 15px;
}

.forget {
  margin: -15px 0 15px;
  font-size: .9em;
  color: var(--text-color);
  display: flex;
  justify-content: space-between;
}

.forget label input {
  margin-right: 3px;

}

.forget label a {
  color: var(--text-color);
  text-decoration: none;
}

.forget label a:hover {
  text-decoration: underline;
}

.button {
  width: 100%;
  height: 40px;
  border-radius: 40px;
  background: var(--text-color);
  color: var(--primary-color);
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 1em;
  font-weight: 600;
  font-family: var(--serif-font);
  margin: 15px 0px;
}

.register {
  font-size: .9em;
  color: var(--text-color);
  text-align: center;
  margin: 25px 0 10px;
}

.register p a {
  text-decoration: none;
  color: var(--text-color);
  font-weight: 600;
}

.register p a:hover {
  text-decoration: underline;
}
</style>