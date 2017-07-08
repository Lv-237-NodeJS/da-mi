const getAuthor = comment => {
  const firstName = comment.User.Profile.first_name;
  const lastName = comment.User.Profile.last_name;
  return firstName + ' ' + lastName;
};

export default getAuthor;
