"use client";
import { FeatureShowcase } from "./FeatureShowcase";
import { recitation, quran, adhkar } from "@/content/showcases";
import { recitationMotion, quranMotion, adhkarMotion } from "@/animations/choreography";

export const RecitationSection = () => (
  <FeatureShowcase data={recitation} motion={recitationMotion} heading="التسميع في تطبيق حِفظ" />
);
export const QuranSection = () => (
  <FeatureShowcase data={quran} motion={quranMotion} heading="المصحف والفهرس والاستماع" tone="tint" />
);
export const AdhkarSection = () => (
  <FeatureShowcase data={adhkar} motion={adhkarMotion} heading="الأذكار وحصن المسلم والمسبحة" />
);
