package com.ability.utils;

import java.io.OutputStream;
import java.util.List;
import javax.servlet.http.HttpServletResponse;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor.HSSFColorPredefined;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.HorizontalAlignment;

import com.ability.dto.custom.UserDetail;
 
public class CustomerExcelWriter {
    

	public void xlsWriter(List<UserDetail> list,HttpServletResponse response) throws Exception {
        // 워크북 생성
        HSSFWorkbook workbook = new HSSFWorkbook();
        // 워크시트 생성
        HSSFSheet sheet = workbook.createSheet();
        // 행 생성
        HSSFRow row = sheet.createRow(0);
        // 쎌 생성
        HSSFCell cell;
        CellStyle headStyle = workbook.createCellStyle();
        // 가는 경계선을 가집니다.
 
        
        // 가는 경계선을 가집니다.
        headStyle.setBorderTop(BorderStyle.THIN);
        headStyle.setBorderBottom(BorderStyle.THIN);
        headStyle.setBorderLeft(BorderStyle.THIN);
        headStyle.setBorderRight(BorderStyle.THIN);

        // 배경색은 노란색입니다.
        headStyle.setFillForegroundColor(HSSFColorPredefined.YELLOW.getIndex());
        headStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        // 데이터는 가운데 정렬합니다.
        headStyle.setAlignment(HorizontalAlignment.CENTER);

        // 데이터용 경계 스타일 테두리만 지정
        CellStyle bodyStyle = workbook.createCellStyle();
        bodyStyle.setBorderTop(BorderStyle.THIN);
        bodyStyle.setBorderBottom(BorderStyle.THIN);
        bodyStyle.setBorderLeft(BorderStyle.THIN);
        bodyStyle.setBorderRight(BorderStyle.THIN);

   
        
        // 헤더 정보 구성
        cell = row.createCell(0);
        cell.setCellValue("유저아이디");
        
        cell = row.createCell(1);
        cell.setCellValue("닉네임");
        
        cell = row.createCell(2);
        cell.setCellValue("이름");
        
        cell = row.createCell(3);
        cell.setCellValue("이메일");
        
        cell = row.createCell(4);
        cell.setCellValue("능력치");
        
        cell = row.createCell(5);
        cell.setCellValue("가입일");
        
        cell = row.createCell(6);
        cell.setCellValue("권한");
        
        cell = row.createCell(7);
        cell.setCellValue("유저이미지");
        
         
        // 리스트의 size 만큼 row를 생성
        UserDetail user;
        for(int rowIdx=0; rowIdx < list.size(); rowIdx++) {
            user = list.get(rowIdx);
            
            // 행 생성
            row = sheet.createRow(rowIdx+1);
            
            cell = row.createCell(0);
            cell.setCellValue(user.getUserid());
            
            cell = row.createCell(1);
            cell.setCellValue(user.getNick_name());
            
            cell = row.createCell(2);
            cell.setCellValue(user.getName());
            
            cell = row.createCell(3);
            cell.setCellValue(user.getEmail());
            
            cell = row.createCell(4);
            cell.setCellValue(user.getReputation());
            
            cell = row.createCell(5);
            cell.setCellValue(user.getDate_created());
            
            cell = row.createCell(6);
            cell.setCellValue(user.getRole_name());
            
            cell = row.createCell(7);
            cell.setCellValue(user.getUser_image());
            
        }
        

        response.setHeader("Content-Encoding", "UTF-8");
        response.setHeader("Content-Disposition", "attachment;filename=Users.xls");
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        OutputStream fileOut = response.getOutputStream();
        workbook.write(fileOut);
        workbook.close();
        fileOut.close();
        
    }
    
   
}