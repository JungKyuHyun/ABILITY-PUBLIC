package com.ability.dto;

import java.sql.Date;

public class Post_Vote {
  private int post_id;
  private Date date_created;
  private int voter;
  private int counta;

  public int getPost_id() {
    return post_id;
  }

  public void setPost_id(int post_id) {
    this.post_id = post_id;
  }

  public Date getDate_created() {
    return date_created;
  }

  public void setDate_created(Date date_created) {
    this.date_created = date_created;
  }

  public int getVoter() {
    return voter;
  }

  public void setVoter(int voter) {
    this.voter = voter;
  }

  public int getCounta() {
    return counta;
  }

  public void setCounta(int counta) {
    this.counta = counta;
  }

}
