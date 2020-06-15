function isAuthorize(user, requiredRoles) {
   if(user) {
      let isAllowed = requiredRoles.find(function (role) {
         return role == user.type;
      });
      if (isAllowed) return true
   }
   return false;
}

function isLogged(user) {
   return user != null;
}

export default { isLogged, isAuthorize }