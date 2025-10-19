package com.yash.calculator.web;

import com.yash.calculator.service.CalculatorService;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/calculate")
public class CalculatorServlet extends HttpServlet {
    private final CalculatorService calculatorService = new CalculatorService();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        double num1 = Double.parseDouble(request.getParameter("num1"));
        double num2 = Double.parseDouble(request.getParameter("num2"));
        String operation = request.getParameter("operation");

        double result = calculatorService.calculate(num1, num2, operation);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        String jsonResponse = "{\"result\": " + result + "}";
        response.getWriter().write(jsonResponse);
    }
}