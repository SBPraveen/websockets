"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const httpRoute = {
  method: "GET",
  path: '/httpRoute',
  handler: (request, h) => {
    return {
      msg: "Duty api called by " + request.query.name
    };
  }
};
var _default = httpRoute;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJodHRwUm91dGUiLCJtZXRob2QiLCJwYXRoIiwiaGFuZGxlciIsInJlcXVlc3QiLCJoIiwibXNnIiwicXVlcnkiLCJuYW1lIiwiX2RlZmF1bHQiLCJleHBvcnRzIiwiZGVmYXVsdCJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvaHR0cFJvdXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBjb25zdCBodHRwUm91dGUgPSB7XG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIHBhdGg6ICcvaHR0cFJvdXRlJyxcbiAgICBoYW5kbGVyOiAocmVxdWVzdCxoKSA9PiB7XG4gICAgICAgIHJldHVybiB7bXNnOlwiRHV0eSBhcGkgY2FsbGVkIGJ5IFwiICsgcmVxdWVzdC5xdWVyeS5uYW1lfVxuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGh0dHBSb3V0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUMsTUFBTUEsU0FBUyxHQUFHO0VBQ2ZDLE1BQU0sRUFBRSxLQUFLO0VBQ2JDLElBQUksRUFBRSxZQUFZO0VBQ2xCQyxPQUFPLEVBQUVBLENBQUNDLE9BQU8sRUFBQ0MsQ0FBQyxLQUFLO0lBQ3BCLE9BQU87TUFBQ0MsR0FBRyxFQUFDLHFCQUFxQixHQUFHRixPQUFPLENBQUNHLEtBQUssQ0FBQ0M7SUFBSSxDQUFDO0VBQzNEO0FBQ0osQ0FBQztBQUFBLElBQUFDLFFBQUEsR0FDY1QsU0FBUztBQUFBVSxPQUFBLENBQUFDLE9BQUEsR0FBQUYsUUFBQSJ9