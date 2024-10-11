import * as bcrypt from "bcrypt";

export function cryptPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

export function comparePassword(plainPass = "", hashword = "") {
  const result = bcrypt.compareSync(plainPass, hashword);
  return result;
};