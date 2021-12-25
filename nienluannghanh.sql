-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th12 12, 2021 lúc 05:24 AM
-- Phiên bản máy phục vụ: 10.4.21-MariaDB
-- Phiên bản PHP: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `nienluannghanh`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chitiethoadonxuat`
--

CREATE TABLE `chitiethoadonxuat` (
  `MaHDX` int(11) NOT NULL,
  `SoLuongXuat` int(11) NOT NULL,
  `MaSP` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `chitiethoadonxuat`
--

INSERT INTO `chitiethoadonxuat` (`MaHDX`, `SoLuongXuat`, `MaSP`) VALUES
(62, 2, 'SP003'),
(63, 2, 'SP003'),
(64, 2, 'SP007'),
(70, 2, 'SP007'),
(72, 2, 'SP003'),
(72, 2, 'SP005'),
(72, 2, 'SP002'),
(72, 2, 'SP003'),
(72, 2, 'SP004'),
(72, 2, 'SP004'),
(72, 2, 'SP003'),
(72, 2, 'SP005'),
(72, 1, 'SP003'),
(72, 2, 'SP003'),
(72, 1, 'SP006'),
(72, 2, 'SP003');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `giohang`
--

CREATE TABLE `giohang` (
  `MaGH` int(11) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `MaSP` varchar(10) NOT NULL,
  `SLSP` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hinhanhsanpham`
--

CREATE TABLE `hinhanhsanpham` (
  `MaSP` varchar(10) NOT NULL,
  `HinhAnhSP` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `hinhanhsanpham`
--

INSERT INTO `hinhanhsanpham` (`MaSP`, `HinhAnhSP`) VALUES
('SP003', 'views\\public\\uploads\\Jordan-1-Mid-White-Shadow-800x600.jpg'),
('SP004', 'views\\public\\uploads\\Jordan-1-Mid-Black-Chile-Red-White-800x600.jpg'),
('SP005', 'views\\public\\uploads\\Jordan-1-Zoom-PSG-800x601.jpg'),
('SP006', 'views\\public\\uploads\\Jordan-1-Retro-High-University-B-800x600.jpg'),
('SP001', 'views\\public\\uploads\\Jordan-1-Retro-High-Dark-Mocha-1-800x600.jpg'),
('SP002', 'views\\public\\uploads\\Nike-air-Jordan-4-Retro-Union-Guava-Ice-800x601.jpg'),
('SP007', 'views\\public\\uploads\\Jordan-1-Retro-High-OG-Vold-Gold-800x600.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hoadonnhap`
--

CREATE TABLE `hoadonnhap` (
  `MaHDN` int(11) NOT NULL,
  `NgayLapHDN` date NOT NULL,
  `SoLuongNhap` int(11) NOT NULL,
  `GiaSPN` int(11) NOT NULL,
  `MaKhoHang` int(11) NOT NULL,
  `MaSP` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `hoadonnhap`
--

INSERT INTO `hoadonnhap` (`MaHDN`, `NgayLapHDN`, `SoLuongNhap`, `GiaSPN`, `MaKhoHang`, `MaSP`) VALUES
(36, '2021-10-24', 25, 300000, 1, 'SP003'),
(37, '2021-10-24', 15, 300000, 1, 'SP004'),
(38, '2021-10-24', 20, 300000, 1, 'SP005'),
(39, '2021-10-24', 25, 300000, 1, 'SP006'),
(40, '2021-10-24', 25, 300000, 1, 'SP001'),
(41, '2021-10-24', 25, 300000, 1, 'SP002'),
(42, '2021-10-24', 25, 750000, 1, 'SP007');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hoadonxuat`
--

CREATE TABLE `hoadonxuat` (
  `MaHDX` int(11) NOT NULL,
  `NgayLapHDX` date NOT NULL,
  `TrangThaiHD` int(11) NOT NULL,
  `MaKH` int(11) NOT NULL,
  `MaKhoHang` int(11) NOT NULL,
  `TinhTrangHD` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `hoadonxuat`
--

INSERT INTO `hoadonxuat` (`MaHDX`, `NgayLapHDX`, `TrangThaiHD`, `MaKH`, `MaKhoHang`, `TinhTrangHD`) VALUES
(62, '2021-11-10', 1, 1, 1, 1),
(63, '2021-11-10', 1, 1, 1, 1),
(64, '2021-11-11', 1, 1, 1, 1),
(70, '2021-11-11', 1, 1, 1, 1),
(72, '2021-11-13', 1, 5, 1, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `khachhang`
--

CREATE TABLE `khachhang` (
  `MaKH` int(11) NOT NULL,
  `TenKH` varchar(50) NOT NULL,
  `SDT` varchar(10) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `DiaChi` varchar(100) NOT NULL,
  `Username` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `khachhang`
--

INSERT INTO `khachhang` (`MaKH`, `TenKH`, `SDT`, `Email`, `DiaChi`, `Username`) VALUES
(1, 'Đào Minh Khoa', '0398423953', 'khoab1809248@student.ctu.edu.vn', '30/4, Hưng Lợi, Ninh Kiều, Cần Thơ', 'B1809248'),
(4, 'Đào Đàos', '0365254852', 'khaose@gmail.com', 'D22323232', 'B1809249'),
(5, 'Trần Hoàng Hải', '0365245125', 'haihai@gmail.com', 'Cần Thơ', 'B1809250'),
(6, 'Đào Minh Khoa', '0398423952', 'daominhkhoa1082000@Gmail.com', 'D2, Thạnh Lợi, Vĩnh Thạnh, Cần Thơ', '0398423952'),
(7, 'Nguyen Van A', '0395236524', 'nguyenvana@gmail.com', '30/4, Ninh Kieu, Can Tho', '0398423953');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `khohang`
--

CREATE TABLE `khohang` (
  `MaKhoHang` int(11) NOT NULL,
  `TenKhoHang` varchar(100) NOT NULL,
  `DiaChiKhoHang` varchar(100) NOT NULL,
  `SDTKhoHang` varchar(10) NOT NULL,
  `MaLSP` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `khohang`
--

INSERT INTO `khohang` (`MaKhoHang`, `TenKhoHang`, `DiaChiKhoHang`, `SDTKhoHang`, `MaLSP`) VALUES
(1, 'Kho Hàng Cần Thơ', '30/4, Hưng Lợi, Ninh Kiều, Cần Thơ', '0582588363', 'LSP01');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `kichthuocsanpham`
--

CREATE TABLE `kichthuocsanpham` (
  `ID` int(2) NOT NULL,
  `KichThuocSP` varchar(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `kichthuocsanpham`
--

INSERT INTO `kichthuocsanpham` (`ID`, `KichThuocSP`) VALUES
(1, '36'),
(2, '37'),
(3, '38'),
(4, '39'),
(5, '40'),
(6, '41'),
(7, '42'),
(8, '43'),
(9, '44'),
(10, '45');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `loaisanpham`
--

CREATE TABLE `loaisanpham` (
  `MaLSP` varchar(10) NOT NULL,
  `TenLSP` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `loaisanpham`
--

INSERT INTO `loaisanpham` (`MaLSP`, `TenLSP`) VALUES
('LSP01', 'Giày');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sanpham`
--

CREATE TABLE `sanpham` (
  `MaSP` varchar(10) NOT NULL,
  `TenSP` varchar(100) NOT NULL,
  `GiaSPX` int(11) NOT NULL,
  `ThongTinSP` varchar(255) NOT NULL,
  `MaTH` varchar(10) NOT NULL,
  `MaLSP` varchar(10) NOT NULL,
  `MaKT` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `sanpham`
--

INSERT INTO `sanpham` (`MaSP`, `TenSP`, `GiaSPX`, `ThongTinSP`, `MaTH`, `MaLSP`, `MaKT`) VALUES
('SP001', 'Nike Air Jordan 1 Retro High COJP Midnight Navy Rep 11', 1200000, '', 'TH004', 'LSP01', 7),
('SP002', 'Giày Nike air Jordan 4 Retro Union Guava Ice Like Auth', 2150000, '', 'TH002', 'LSP01', 4),
('SP003', 'Giày Nike Air Jordan 1 Mid White Shadow', 950000, 'HAHA', 'TH004', 'LSP01', 3),
('SP004', 'Nike Air Jordan 1 Mid Black Chile Red White Rep 1:1', 750000, 'Giày rất đẹp', 'TH004', 'LSP01', 5),
('SP005', 'Nike Air Jordan 1 Zoom Air PSG Paris Saint-Germain', 750000, '', 'TH004', 'LSP01', 6),
('SP006', 'Nike Air Jordan 1 Retro High University Blue Like Auth', 750000, '', 'TH004', 'LSP01', 5),
('SP007', 'Giày Nike Air Jordan 1 Retro High Volt Gold', 3150000, '', 'TH002', 'LSP01', 5);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `taikhoan`
--

CREATE TABLE `taikhoan` (
  `Username` varchar(50) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Role` varchar(5) NOT NULL DEFAULT 'USER'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `taikhoan`
--

INSERT INTO `taikhoan` (`Username`, `Password`, `Role`) VALUES
('0398423952', 'matkhau', 'USER'),
('0398423953', 'a788f6d55914857d4b97c1de99cb896b', 'USER'),
('admin', '21232f297a57a5a743894a0e4a801fc3', 'ADMIN'),
('B1809248', 'matkhau', 'USER'),
('B18092480', 'daominh', 'USER'),
('B1809249', 'matkhau', 'USER'),
('B1809250', 'matkhau', 'USER'),
('B1809255', 'matkhau', 'USER');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thuonghieu`
--

CREATE TABLE `thuonghieu` (
  `MaTH` varchar(10) NOT NULL,
  `TenTH` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `thuonghieu`
--

INSERT INTO `thuonghieu` (`MaTH`, `TenTH`) VALUES
('TH001', 'Adidas'),
('TH002', 'Nike'),
('TH003', 'Supreme'),
('TH004', 'Jordan'),
('TH005', 'Puma'),
('TH006', 'Balenciaga'),
('TH007', 'Converse'),
('TH008', 'Vans');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `chitiethoadonxuat`
--
ALTER TABLE `chitiethoadonxuat`
  ADD KEY `Relationship 18` (`MaSP`),
  ADD KEY `Relationship 30` (`MaHDX`);

--
-- Chỉ mục cho bảng `giohang`
--
ALTER TABLE `giohang`
  ADD PRIMARY KEY (`MaGH`),
  ADD KEY `Relationship 5` (`Username`),
  ADD KEY `Relationship 19` (`MaSP`);

--
-- Chỉ mục cho bảng `hinhanhsanpham`
--
ALTER TABLE `hinhanhsanpham`
  ADD KEY `Relationship 11` (`MaSP`);

--
-- Chỉ mục cho bảng `hoadonnhap`
--
ALTER TABLE `hoadonnhap`
  ADD PRIMARY KEY (`MaHDN`),
  ADD KEY `Relationship 6` (`MaKhoHang`),
  ADD KEY `Relationship 20` (`MaSP`);

--
-- Chỉ mục cho bảng `hoadonxuat`
--
ALTER TABLE `hoadonxuat`
  ADD PRIMARY KEY (`MaHDX`),
  ADD KEY `Relationship 7` (`MaKH`),
  ADD KEY `Relationship 8` (`MaKhoHang`);

--
-- Chỉ mục cho bảng `khachhang`
--
ALTER TABLE `khachhang`
  ADD PRIMARY KEY (`MaKH`),
  ADD KEY `Relationship 9` (`Username`);

--
-- Chỉ mục cho bảng `khohang`
--
ALTER TABLE `khohang`
  ADD PRIMARY KEY (`MaKhoHang`),
  ADD KEY `Relationship 10` (`MaLSP`);

--
-- Chỉ mục cho bảng `kichthuocsanpham`
--
ALTER TABLE `kichthuocsanpham`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `loaisanpham`
--
ALTER TABLE `loaisanpham`
  ADD PRIMARY KEY (`MaLSP`);

--
-- Chỉ mục cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  ADD PRIMARY KEY (`MaSP`),
  ADD KEY `Relationship 14` (`MaTH`),
  ADD KEY `Relationship 15` (`MaLSP`),
  ADD KEY `Relationship 12` (`MaKT`);

--
-- Chỉ mục cho bảng `taikhoan`
--
ALTER TABLE `taikhoan`
  ADD PRIMARY KEY (`Username`);

--
-- Chỉ mục cho bảng `thuonghieu`
--
ALTER TABLE `thuonghieu`
  ADD PRIMARY KEY (`MaTH`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `giohang`
--
ALTER TABLE `giohang`
  MODIFY `MaGH` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=115;

--
-- AUTO_INCREMENT cho bảng `hoadonnhap`
--
ALTER TABLE `hoadonnhap`
  MODIFY `MaHDN` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT cho bảng `hoadonxuat`
--
ALTER TABLE `hoadonxuat`
  MODIFY `MaHDX` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT cho bảng `khachhang`
--
ALTER TABLE `khachhang`
  MODIFY `MaKH` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `khohang`
--
ALTER TABLE `khohang`
  MODIFY `MaKhoHang` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `kichthuocsanpham`
--
ALTER TABLE `kichthuocsanpham`
  MODIFY `ID` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `chitiethoadonxuat`
--
ALTER TABLE `chitiethoadonxuat`
  ADD CONSTRAINT `Relationship 18` FOREIGN KEY (`MaSP`) REFERENCES `sanpham` (`MaSP`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Relationship 30` FOREIGN KEY (`MaHDX`) REFERENCES `hoadonxuat` (`MaHDX`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `giohang`
--
ALTER TABLE `giohang`
  ADD CONSTRAINT `Relationship 19` FOREIGN KEY (`MaSP`) REFERENCES `sanpham` (`MaSP`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Relationship 5` FOREIGN KEY (`Username`) REFERENCES `taikhoan` (`Username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `hinhanhsanpham`
--
ALTER TABLE `hinhanhsanpham`
  ADD CONSTRAINT `Relationship 11` FOREIGN KEY (`MaSP`) REFERENCES `sanpham` (`MaSP`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `hoadonnhap`
--
ALTER TABLE `hoadonnhap`
  ADD CONSTRAINT `Relationship 20` FOREIGN KEY (`MaSP`) REFERENCES `sanpham` (`MaSP`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Relationship 6` FOREIGN KEY (`MaKhoHang`) REFERENCES `khohang` (`MaKhoHang`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `hoadonxuat`
--
ALTER TABLE `hoadonxuat`
  ADD CONSTRAINT `Relationship 7` FOREIGN KEY (`MaKH`) REFERENCES `khachhang` (`MaKH`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Relationship 8` FOREIGN KEY (`MaKhoHang`) REFERENCES `khohang` (`MaKhoHang`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `khachhang`
--
ALTER TABLE `khachhang`
  ADD CONSTRAINT `Relationship 9` FOREIGN KEY (`Username`) REFERENCES `taikhoan` (`Username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `khohang`
--
ALTER TABLE `khohang`
  ADD CONSTRAINT `Relationship 10` FOREIGN KEY (`MaLSP`) REFERENCES `loaisanpham` (`MaLSP`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  ADD CONSTRAINT `Relationship 12` FOREIGN KEY (`MaKT`) REFERENCES `kichthuocsanpham` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Relationship 14` FOREIGN KEY (`MaTH`) REFERENCES `thuonghieu` (`MaTH`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Relationship 15` FOREIGN KEY (`MaLSP`) REFERENCES `loaisanpham` (`MaLSP`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
