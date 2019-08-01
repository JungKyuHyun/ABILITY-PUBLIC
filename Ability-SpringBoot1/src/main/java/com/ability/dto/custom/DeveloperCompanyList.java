package com.ability.dto.custom;

import java.sql.Date;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public class DeveloperCompanyList {
	private int userid;
	private String email;
	private String password;
	private String nick_name;
	private String name;
	private int enabled;
	private String area;
	private Date udate_created;
	private Date ulast_updated;
	private int reputation;
	private String user_image;
	private long tel;
	private String user_info;
	private String tags;
	private String company_email;
	private String company_name;
	private String company_tel;
	private String company_area;
	private String logo;
	private String register_number;
	private String register_file;
	private String homepage_url;
	private String company_info;
	private Date cdate_created;
	private Date clast_updated;
	private String xloc;
	private String yloc;
	private String resume;
	private List<MultipartFile> files;
	
	
	public int getUserid() {
		return userid;
	}
	public void setUserid(int userid) {
		this.userid = userid;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getNick_name() {
		return nick_name;
	}
	public void setNick_name(String nick_name) {
		this.nick_name = nick_name;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getEnabled() {
		return enabled;
	}
	public void setEnabled(int enabled) {
		this.enabled = enabled;
	}
	public String getArea() {
		return area;
	}
	public void setArea(String area) {
		this.area = area;
	}
	public Date getUdate_created() {
		return udate_created;
	}
	public void setUdate_created(Date udate_created) {
		this.udate_created = udate_created;
	}
	public Date getUlast_updated() {
		return ulast_updated;
	}
	public void setUlast_updated(Date ulast_updated) {
		this.ulast_updated = ulast_updated;
	}
	public int getReputation() {
		return reputation;
	}
	public void setReputation(int reputation) {
		this.reputation = reputation;
	}
	public String getUser_image() {
		return user_image;
	}
	public void setUser_image(String user_image) {
		this.user_image = user_image;
	}
	public long getTel() {
		return tel;
	}
	public void setTel(long tel) {
		this.tel = tel;
	}
	public String getUser_info() {
		return user_info;
	}
	public void setUser_info(String user_info) {
		this.user_info = user_info;
	}
	public String getTags() {
		return tags;
	}
	public void setTags(String tags) {
		this.tags = tags;
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
	public String getCompany_tel() {
		return company_tel;
	}
	public void setCompany_tel(String company_tel) {
		this.company_tel = company_tel;
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
	public Date getCdate_created() {
		return cdate_created;
	}
	public void setCdate_created(Date cdate_created) {
		this.cdate_created = cdate_created;
	}
	public Date getClast_updated() {
		return clast_updated;
	}
	public void setClast_updated(Date clast_updated) {
		this.clast_updated = clast_updated;
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
	public String getResume() {
		return resume;
	}
	public void setResume(String resume) {
		this.resume = resume;
	}
	public List<MultipartFile> getFiles() {
		return files;
	}
	public void setFiles(List<MultipartFile> files) {
		this.files = files;
	}
	
		
		
}
