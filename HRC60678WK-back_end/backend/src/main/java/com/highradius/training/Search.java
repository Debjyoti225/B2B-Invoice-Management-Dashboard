package com.highradius.training;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * Servlet implementation class Search
 */
@WebServlet("/Search")
public class Search extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Search() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		try {
			HashMap<Object, Object> Response = new HashMap<Object, Object>();
			ArrayList<Data> responseList = new ArrayList<Data>();
			String doc_id = request.getParameter("doc_id");
			String invoice_id = request.getParameter("invoice_id");
			String cust_number = request.getParameter("cust_number");
			String buisness_year = request.getParameter("buisness_year");
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection con= DriverManager.getConnection("jdbc:mysql://localhost:3306/grey_goose","root","debjyoti");
			String search_query = "SELECT sl_no, business_code, cust_number, clear_date, buisness_year, doc_id, posting_date, document_create_date, due_in_date, invoice_currency, document_type, posting_id, total_open_amount, baseline_create_date, cust_payment_terms, invoice_id FROM winter_internship WHERE cust_number LIKE ? AND doc_id LIKE ? AND invoice_id LIKE ? AND buisness_year LIKE ?";
			PreparedStatement ps = con.prepareStatement(search_query);
			ps.setString(1, "%" + cust_number + "%");
			ps.setString(2, "%" + doc_id + "%");
			ps.setString(3, "%" + invoice_id + "%");
			ps.setString(4, "%" + buisness_year + "%");
			
			ResultSet rs = ps.executeQuery();
			while(rs.next()) {
				Data obj = new Data(rs.getInt("sl_no"),rs.getString("business_code"),rs.getInt("cust_number"),rs.getString("clear_date"),rs.getInt("buisness_year"),rs.getString("doc_id"),rs.getString("posting_date"),rs.getString("document_create_date"),rs.getString("due_in_date"),rs.getString("invoice_currency"),rs.getString("document_type"),rs.getInt("posting_id"),rs.getInt("total_open_amount"),rs.getString("baseline_create_date"),rs.getString("cust_payment_terms"),rs.getInt("invoice_id"));
//				obj.setSl_no(rs.getInt(1));
//				obj.setBusiness_code(rs.getString(2));
//				obj.setCust_number(rs.getInt(3));
//				obj.setClear_date(rs.getString(4));
//				obj.setBuisness_year(rs.getInt(5));
//				obj.setDoc_id(rs.getString(6));
//				obj.setPosting_date(rs.getString(7));
//				obj.setDocument_create_date(rs.getString(8));
//				obj.setDue_in_date(rs.getString(9));
//				obj.setInvoice_currency(rs.getString(10));
////				obj.setDocument_type(rs.getString(11));
//				obj.setPosting_id(rs.getInt(12));
//				obj.setTotal_open_amount(rs.getDouble(13));
//				obj.setBaseline_create_date(rs.getString(14));
//				obj.setCust_payment_terms(rs.getString(15));
//				obj.setInvoice_id(rs.getInt(16));
				
				responseList.add(obj);
			}
			Response.put("search", responseList);
			Gson gson = new GsonBuilder().setPrettyPrinting().create();
			String json = gson.toJson(responseList);
			response.setContentType("application/json");
			response.setHeader("Access-Control-Allow-Origin", "*");
			response.getWriter().write(json);
			con.close();
		} catch(Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
