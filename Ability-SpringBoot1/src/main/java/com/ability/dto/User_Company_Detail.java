package com.ability.dto;

import java.sql.Date;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public class User_Company_Detail {
	private int userid;
	private String company_email;
	private String company_name;
	private String company_tel;
	private String manager_tel;
	private String company_area;
	private String logo;
	private String register_number;
	private String register_file;
	private String homepage_url;
	private String company_info;
	private Date date_created;
	private Date last_updated;
	private String xloc;
	private String yloc;
	private List<MultipartFile> files;
	
	
	
	public int getUserid() {
		return userid;
	}
	public void setUserid(int userid) {
		this.userid = userid;
	}
	public String getCompany_tel() {
		return company_tel;
	}
	public void setCompany_tel(String company_tel) {
		this.company_tel = company_tel;
	}
	public String getManager_tel() {
		return manager_tel;
	}
	public void setManager_tel(String manager_tel) {
		this.manager_tel = manager_tel;
	}
	public String getXloc() {
		return xloc;
	}
	public void setXloc(String xloc) {
		this.xloc = xloc;
	}
	public String getYloc() {
		return yloc;
	}
	public void setYloc(String yloc) {
		this.yloc = yloc;
	}
	public List<MultipartFile> getFiles() {
		return files;
	}
	public void setFiles(List<MultipartFile> files) {
		this.files = files;
	}
	public String getCompany_email() {
		return company_email;
	}
	public void setCompany_email(String company_email) {
		this.company_email = company_email;
	}
	public String getCompany_name() {
		return company_name;
	}
	public void setCompany_name(String company_name) {
		this.company_name = company_name;
	}
	public String getCompany_area() {
		return company_area;
	}
	public void setCompany_area(String company_area) {
		this.company_area = company_area;
	}
	public String getLogo() {
		return logo;
	}
	public void setLogo(String logo) {
		this.logo = logo;
	}
	public String getRegister_number() {
		return register_number;
	}
	public void setRegister_number(String register_number) {
		this.register_number = register_number;
	}
	public String getRegister_file() {
		return register_file;
	}
	public void setRegister_file(String register_file) {
		this.register_file = register_file;
	}
	public String getHomepage_url() {
		return homepage_url;
	}
	public void setHomepage_url(String homepage_url) {
		this.homepage_url = homepage_url;
	}
	public String getCompany_info() {
		return company_info;
	}
	public void setCompany_info(String company_info) {
		this.company_info = company_info;
	}
	public Date getDate_created() {
		return date_created;
	}
	public void setDate_created(Date date_created) {
		this.date_created = date_created;
	}
	public Date getLast_updated() {
		return last_updated;
	}
	public void setLast_updated(Date last_updated) {
		this.last_updated = last_updated;
	}
	
	@Override
	public String toString() {
		return "User_Company_Detail [userid=" + userid + ", company_email=" + company_email + ", company_name="
				+ company_name + ", company_tel=" + company_tel + ", manager_tel=" + manager_tel + ", company_area="
				+ company_area + ", logo=" + logo + ", register_number=" + register_number + ", register_file="
				+ register_file + ", homepage_url=" + homepage_url + ", company_info=" + company_info
				+ ", date_created=" + date_created + ", last_updated=" + last_updated + "]";
	}
	
	
	
    
}