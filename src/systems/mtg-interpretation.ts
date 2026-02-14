import { MTGCard, InterpretationTag, ReadingResult, ExtractedFeatures, ManaNumerologyEntry } from '../types/mtg';
import correspondencesData from '../data/mtg/correspondences.json';

const CORRESPONDENCES = correspondencesData as any;

export const interpretationEngine = {
    analyze: (card: MTGCard, context: string = 'general'): ReadingResult => {
        const tags: InterpretationTag[] = [];
        const triggers: string[] = [];

        // 1. Mana Numerology (The Backbone)
        // Handle MV > 10
        let mv = Math.floor(card.features.manaValue);
        if (mv > 10) mv = 10; // Cap at 10 for basic numerology

        const numerology: ManaNumerologyEntry = CORRESPONDENCES.manaNumerology[mv.toString()];
        if (numerology) {
            tags.push({
                id: `mv-${mv}`,
                source: `Mana Value ${mv}`,
                axis: 'drive', // Core theme usually fits drive or domain
                text: numerology.coreTheme,
                weight: 1.0
            });
            triggers.push(`Mana Value ${mv}: ${numerology.coreTheme}`);
        }

        // 2. Color Symbolism
        // If multicolor, we might want to look at M entry or individual colors
        if (card.features.colors.length === 0) {
            // Colorless
            const cData = CORRESPONDENCES.colors["C"];
            if (cData) applyColorTags(cData, "Colorless", tags);
        } else if (card.features.colors.length > 1) {
            const cData = CORRESPONDENCES.colors["M"];
            if (cData) applyColorTags(cData, "Multicolor", tags);
        }

        // Also add individual color tags for nuance
        card.features.colors.forEach(color => {
            const cData = CORRESPONDENCES.colors[color];
            if (cData) applyColorTags(cData, `Color ${color}`, tags);
        });

        // 3. Type Symbolism
        card.features.types.forEach(type => {
            const tKey = type.toLowerCase();
            const tData = CORRESPONDENCES.types[tKey];
            if (tData) {
                tags.push({
                    id: `type-${tKey}`,
                    source: `Type: ${type}`,
                    axis: 'domain',
                    text: tData.role,
                    weight: 0.8
                });
                triggers.push(`Type ${type}: ${tData.role}`);
            }
        });

        // 4. Keyword & Action Signals
        card.features.keywords.forEach(kw => {
            const kKey = kw.toLowerCase();
            const kData = CORRESPONDENCES.keywords[kKey];
            if (kData) {
                tags.push({
                    id: `kw-${kKey}`,
                    source: `Keyword: ${kw}`,
                    axis: kData.axis,
                    text: kData.meaning,
                    weight: 0.7
                });
                triggers.push(`Keyword ${kw}: ${kData.meaning}`);
            }
        });

        card.features.actionSignals.forEach(act => {
            const aKey = act.toLowerCase();
            const aData = CORRESPONDENCES.actions[aKey];
            if (aData) {
                tags.push({
                    id: `act-${aKey}`,
                    source: `Signal: ${act}`,
                    axis: aData.axis,
                    text: aData.meaning,
                    weight: 0.6
                });
                triggers.push(`Signal ${act}: ${aData.meaning}`);
            }
        });

        // Synthesize Narrative
        const narrative = generateNarrative(card, tags, numerology, context);

        return {
            cardId: card.id,
            context,
            tags,
            narrative,
            analysis: {
                featureTriggers: triggers
            }
        };
    }
};

const applyColorTags = (cData: any, source: string, tags: InterpretationTag[]) => {
    // Pick one from each category randomly or all?
    // For a deterministic reading, picking all might be noisy. 
    // Let's pick the first 2 for now.
    cData.drive.slice(0, 2).forEach((t: string) => tags.push({ id: `col-drive-${t}`, source, axis: 'drive', text: t, weight: 0.5 }));
    cData.domain.slice(0, 2).forEach((t: string) => tags.push({ id: `col-domain-${t}`, source, axis: 'domain', text: t, weight: 0.5 }));
};

const generateNarrative = (card: MTGCard, tags: InterpretationTag[], numerology: ManaNumerologyEntry, context: string): string => {
    // A simple template-based generator based on context

    const drives = tags.filter(t => t.axis === 'drive').map(t => t.text).join(', ');
    const domains = tags.filter(t => t.axis === 'domain').map(t => t.text).join(', ');
    const advices = tags.filter(t => t.axis === 'advice').map(t => t.text).join(', ');

    let text = "";

    if (numerology) {
        text += `**${numerology.coreTheme}**: ${numerology.situation} `;
    }

    if (context === 'past') {
        text += `Reflect on how **${drives}** influenced your path. The foundation was built on **${domains}**. `;
    } else if (context === 'present') {
        text += `You are currently facing a moment of **${drives}**. The key areas of your life affected are **${domains}**. `;
    } else if (context === 'future' || context === 'advice') {
        text += `The cards suggest you should focus on **${drives}**. Consider **${advices}** as your strategy. `;
    } else {
        text += `This card embodies **${drives}** within the realm of **${domains}**. `;
    }

    if (card.features.pipAnalysis.concentrationScore > 0.7) {
        text += `The heavy color commitment suggests you must be unwavering in this approach. `;
    } else if (card.features.pipAnalysis.dominantColor === 'Balanced') {
        text += `A balanced approach is required here. `;
    }

    return text;
};
