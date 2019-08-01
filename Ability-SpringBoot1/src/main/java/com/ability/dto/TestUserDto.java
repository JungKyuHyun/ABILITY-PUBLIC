package com.ability.dto;

import lombok.Data;

//테스트용으로 삭
@Data
public class TestUserDto {
	private int seq;
    private String itemid;
    
	@Override
	public String toString() {
		return "userDto [seq=" + seq + ", itemid=" + itemid + "]";
	}

	public int getSeq() {
		return seq;
	}

	public void setSeq(int seq) {
		this.seq = seq;
	}

	public String getItemid() {
		return itemid;
	}

	public void setItemid(String itemid) {
		this.itemid = itemid;
	}

    
    
}
