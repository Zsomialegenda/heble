import jakarta.servlet.*;
import jakarta.servlet.http.*;
import java.io.*;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String email = request.getParameter("email");
        String password = request.getParameter("password");

        // Dummy check for login
        if ("john.doe@example.com".equals(email) && "password123".equals(password)) {
            response.getWriter().write("success"); // Send success response
        } else {
            response.getWriter().write("error"); // Send error response
        }
    }
}