USE [master]
GO
/****** Object:  Database [macon]    Script Date: 09/02/2022 10:08:34 ******/
CREATE DATABASE [macon]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'macon', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER1\MSSQL\DATA\macon.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'macon_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER1\MSSQL\DATA\macon_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [macon] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [macon].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [macon] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [macon] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [macon] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [macon] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [macon] SET ARITHABORT OFF 
GO
ALTER DATABASE [macon] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [macon] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [macon] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [macon] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [macon] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [macon] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [macon] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [macon] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [macon] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [macon] SET  ENABLE_BROKER 
GO
ALTER DATABASE [macon] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [macon] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [macon] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [macon] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [macon] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [macon] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [macon] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [macon] SET RECOVERY FULL 
GO
ALTER DATABASE [macon] SET  MULTI_USER 
GO
ALTER DATABASE [macon] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [macon] SET DB_CHAINING OFF 
GO
ALTER DATABASE [macon] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [macon] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [macon] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [macon] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'macon', N'ON'
GO
ALTER DATABASE [macon] SET QUERY_STORE = OFF
GO
USE [macon]
GO
/****** Object:  User [abbyy]    Script Date: 09/02/2022 10:08:34 ******/
CREATE USER [abbyy] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [abbyy]
GO
ALTER ROLE [db_accessadmin] ADD MEMBER [abbyy]
GO
ALTER ROLE [db_securityadmin] ADD MEMBER [abbyy]
GO
ALTER ROLE [db_ddladmin] ADD MEMBER [abbyy]
GO
ALTER ROLE [db_backupoperator] ADD MEMBER [abbyy]
GO
ALTER ROLE [db_datareader] ADD MEMBER [abbyy]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [abbyy]
GO
ALTER ROLE [db_denydatareader] ADD MEMBER [abbyy]
GO
ALTER ROLE [db_denydatawriter] ADD MEMBER [abbyy]
GO
/****** Object:  Table [dbo].[AgendTravels]    Script Date: 09/02/2022 10:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AgendTravels](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[travelId] [int] NULL,
	[userAgendCode] [varchar](50) NOT NULL,
	[placesReserve] [int] NOT NULL,
	[personalCodeAgend] [varchar](50) NOT NULL,
	[notes] [text] NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[phoneNumber] [varchar](50) NULL,
	[status] [varchar](50) NULL,
	[deleted_at] [datetime] NULL,
	[clientName] [varchar](255) NULL,
	[baggageNumber] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Countries]    Script Date: 09/02/2022 10:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Countries](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[countryName] [varchar](50) NULL,
	[region] [varchar](250) NULL,
	[codeCountry] [varchar](50) NOT NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[deleted_at] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Payment]    Script Date: 09/02/2022 10:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Payment](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[agendTravelCode] [int] NOT NULL,
	[paymentReference] [varchar](50) NULL,
	[status] [varchar](50) NOT NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[deletet_at] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Person]    Script Date: 09/02/2022 10:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Person](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[typeProfileId] [int] NULL,
	[firstName] [varchar](250) NULL,
	[lastName] [varchar](250) NULL,
	[completeName] [varchar](50) NOT NULL,
	[BI] [varchar](50) NULL,
	[birthDate] [date] NULL,
	[userId] [int] NULL,
	[phoneNumber] [varchar](150) NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[deleted_at] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[BI] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Profile]    Script Date: 09/02/2022 10:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Profile](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[profileName] [varchar](250) NOT NULL,
	[Description] [text] NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[deleted_at] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Provinces]    Script Date: 09/02/2022 10:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Provinces](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ProvinceName] [varchar](50) NOT NULL,
	[region] [varchar](250) NULL,
	[codeProvince] [varchar](50) NOT NULL,
	[countryId] [int] NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[deleted_at] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Spots]    Script Date: 09/02/2022 10:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Spots](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[spotName] [varchar](50) NOT NULL,
	[description] [text] NULL,
	[location] [text] NULL,
	[contacts] [varchar](50) NULL,
	[provinceId] [int] NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[deleted_at] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Transport]    Script Date: 09/02/2022 10:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Transport](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[transportName] [varchar](50) NULL,
	[transportNumber] [int] NULL,
	[totalPlace] [int] NULL,
	[typeTransportId] [int] NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[deleted_at] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Travels]    Script Date: 09/02/2022 10:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Travels](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[departureDate] [date] NULL,
	[returnDate] [date] NULL,
	[timeToGoTo] [time](7) NULL,
	[timeToArrival] [time](7) NULL,
	[observations] [varchar](255) NULL,
	[spotId] [int] NULL,
	[originProvince] [int] NOT NULL,
	[destinyProvince] [int] NOT NULL,
	[transportId] [int] NULL,
	[price] [int] NOT NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[deleted_at] [datetime] NULL,
 CONSTRAINT [Travels_PK] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TypeTransport]    Script Date: 09/02/2022 10:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TypeTransport](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[typeName] [varchar](250) NOT NULL,
	[Description] [text] NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[deleted_at] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 09/02/2022 10:08:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[username] [varchar](250) NOT NULL,
	[code] [varchar](50) NOT NULL,
	[password] [varchar](250) NOT NULL,
	[profileId] [int] NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[email] [varchar](250) NOT NULL,
	[deleted_at] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[AgendTravels] ADD  DEFAULT (NULL) FOR [created_at]
GO
ALTER TABLE [dbo].[AgendTravels] ADD  DEFAULT (NULL) FOR [updated_at]
GO
ALTER TABLE [dbo].[Countries] ADD  DEFAULT (NULL) FOR [created_at]
GO
ALTER TABLE [dbo].[Countries] ADD  DEFAULT (NULL) FOR [updated_at]
GO
ALTER TABLE [dbo].[Payment] ADD  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[Person] ADD  DEFAULT (NULL) FOR [created_at]
GO
ALTER TABLE [dbo].[Person] ADD  DEFAULT (NULL) FOR [updated_at]
GO
ALTER TABLE [dbo].[Profile] ADD  DEFAULT (NULL) FOR [created_at]
GO
ALTER TABLE [dbo].[Profile] ADD  DEFAULT (NULL) FOR [updated_at]
GO
ALTER TABLE [dbo].[Provinces] ADD  DEFAULT (NULL) FOR [created_at]
GO
ALTER TABLE [dbo].[Provinces] ADD  DEFAULT (NULL) FOR [updated_at]
GO
ALTER TABLE [dbo].[Spots] ADD  DEFAULT (NULL) FOR [created_at]
GO
ALTER TABLE [dbo].[Spots] ADD  DEFAULT (NULL) FOR [updated_at]
GO
ALTER TABLE [dbo].[Transport] ADD  DEFAULT (NULL) FOR [created_at]
GO
ALTER TABLE [dbo].[Transport] ADD  DEFAULT (NULL) FOR [updated_at]
GO
ALTER TABLE [dbo].[Travels] ADD  DEFAULT (NULL) FOR [created_at]
GO
ALTER TABLE [dbo].[Travels] ADD  DEFAULT (NULL) FOR [updated_at]
GO
ALTER TABLE [dbo].[TypeTransport] ADD  DEFAULT (NULL) FOR [created_at]
GO
ALTER TABLE [dbo].[TypeTransport] ADD  DEFAULT (NULL) FOR [updated_at]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT (NULL) FOR [created_at]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT (NULL) FOR [updated_at]
GO
ALTER TABLE [dbo].[AgendTravels]  WITH CHECK ADD FOREIGN KEY([travelId])
REFERENCES [dbo].[Travels] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Payment]  WITH CHECK ADD FOREIGN KEY([agendTravelCode])
REFERENCES [dbo].[AgendTravels] ([id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Person]  WITH CHECK ADD FOREIGN KEY([typeProfileId])
REFERENCES [dbo].[Profile] ([id])
GO
ALTER TABLE [dbo].[Provinces]  WITH CHECK ADD  CONSTRAINT [FK__Province__3213E83FBAD04A58] FOREIGN KEY([countryId])
REFERENCES [dbo].[Countries] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Provinces] CHECK CONSTRAINT [FK__Province__3213E83FBAD04A58]
GO
ALTER TABLE [dbo].[Provinces]  WITH CHECK ADD FOREIGN KEY([countryId])
REFERENCES [dbo].[Countries] ([id])
GO
ALTER TABLE [dbo].[Spots]  WITH CHECK ADD FOREIGN KEY([provinceId])
REFERENCES [dbo].[Provinces] ([id])
GO
ALTER TABLE [dbo].[Transport]  WITH CHECK ADD FOREIGN KEY([typeTransportId])
REFERENCES [dbo].[TypeTransport] ([id])
GO
ALTER TABLE [dbo].[Travels]  WITH CHECK ADD  CONSTRAINT [Travels_Provinces_FK] FOREIGN KEY([originProvince])
REFERENCES [dbo].[Provinces] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Travels] CHECK CONSTRAINT [Travels_Provinces_FK]
GO
ALTER TABLE [dbo].[Travels]  WITH CHECK ADD  CONSTRAINT [Travels_Provinces2_FK] FOREIGN KEY([destinyProvince])
REFERENCES [dbo].[Provinces] ([id])
GO
ALTER TABLE [dbo].[Travels] CHECK CONSTRAINT [Travels_Provinces2_FK]
GO
ALTER TABLE [dbo].[Travels]  WITH CHECK ADD  CONSTRAINT [Travels_Spots_FK] FOREIGN KEY([spotId])
REFERENCES [dbo].[Spots] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Travels] CHECK CONSTRAINT [Travels_Spots_FK]
GO
ALTER TABLE [dbo].[Travels]  WITH CHECK ADD  CONSTRAINT [Travels_Transport_FK] FOREIGN KEY([transportId])
REFERENCES [dbo].[Transport] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Travels] CHECK CONSTRAINT [Travels_Transport_FK]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD FOREIGN KEY([profileId])
REFERENCES [dbo].[Profile] ([id])
GO
USE [master]
GO
ALTER DATABASE [macon] SET  READ_WRITE 
GO
