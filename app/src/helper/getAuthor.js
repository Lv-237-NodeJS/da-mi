const getAuthor = comment => {
  const { first_name: firstName, last_name: lastName } = comment.User.Profile;
  return firstName + ' ' + lastName;
};

export default getAuthor;
