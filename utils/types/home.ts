export interface AboutUsData {
  id: number;
  title: string;
  count: number;
  fixed: boolean;
}

export interface Banner {
  id: number;
  sectionName: string;
  sectionUrl: string | null;
  visible: boolean;
}

export interface MatchSection {
  id: number;
  sectionName: string;
  sectionUrl: string | null;
  visible: boolean;
}

export interface HomeApiResponseData {
  liveMatch: MatchSection;
  upcomingMatch: MatchSection;
  aboutUsData: AboutUsData[];
  aboutUsImages: any[];
  banner: Banner;
}
