function ProtectedRoute({ user, children }) {
  if (user == null) {
    return null;
  }

  return children;
}

export default ProtectedRoute;
