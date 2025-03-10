const handleError = (status, massage, üzenet) => {
  return (error, req, res, next, reason) => {
    if (error) {
      console.error(`Error (${status}):`, error);
      console.error(`Hiba (${status}):`, error);
    } else {
      console.error(`Unknown error occurred (Status: ${status}).`);
      console.error(`Váratlan hiba történt (Status: ${status}).`);
    }

    if (!reason || !Array.isArray(reason) || reason.length < 2) {
      res.status(status).json({
        status,
        message: massage,
        üzenet: üzenet,
      });
    }

    res.status(status).json({
      status,
      message: massage,
      reason: reason[0],
      üzenet: üzenet,
      indok: reason[1],
    });
  };
};

const Code400 = handleError(400, "Bad request.", "Hibás kérés.");
const Code401 = handleError(401, "Unauthorized.", "Jogosulatlan.");
const Code403 = handleError(403, "Forbidden.", "Elutasítva.");
const Code404 = handleError(
  404,
  "Resource not found.",
  "Az erőforrás nem található."
);
const Code409 = handleError(409, "Conflict.", "Konfliktus.");
const Code500 = handleError(
  500,
  "Internal server error.",
  "Belső szerverhiba történt."
);

module.exports = {
  Code400,
  Code401,
  Code403,
  Code404,
  Code409,
  Code500
};
