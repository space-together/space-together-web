import { db } from "@/lib/db";
import { Sector } from "../../../prisma/prisma/generated";

class SectorService {
  private async _populateEducationName(sector: Sector | null): Promise<Sector | null> {
    if (sector?.education_id) {
      const education = await db.sector.findUnique({ where: { id: sector.education_id } });
      if (education) {
        sector.education_id = education.name;
      }
    }
    return sector;
  }

  async getSectorById(id: string): Promise<Sector | null> {
    try {
      const sector = await db.sector.findUnique({ where: { id } });
      return await this._populateEducationName(sector);
    } catch {
      return null;
    }
  }

  async getSectorByUsername(username: string): Promise<Sector | null> {
    try {
      const sector = await db.sector.findUnique({ where: { username } });
      return await this._populateEducationName(sector);
    } catch {
      return null;
    }
  }

  async getAllSectors(): Promise<Sector[]> {
    try {
      const sectors = await db.sector.findMany();
      const populatedSectors = await Promise.all(sectors.map(this._populateEducationName.bind(this)));
      return populatedSectors.filter((sector): sector is Sector => sector !== null);
    } catch {
      return [];
    }
  }

  async getSectorsByEducationId(education_id: string): Promise<Sector[]> {
    try {
      const sectors = await db.sector.findMany({ where: { education_id } });
      const populatedSectors = await Promise.all(sectors.map(this._populateEducationName.bind(this)));
      return populatedSectors.filter((sector): sector is Sector => sector !== null);
    } catch {
      return [];
    }
  }
}

const sectorService = new SectorService();
export default sectorService;