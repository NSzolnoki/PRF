const mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
    Id: {type: String, unique: true, required: true, lowercase: true},
    Name: { type: String, required: true},
    Description: { type: String, required: true},
    Durability: { type: Number},
    Ergonomics: { type: Number},
    QuestItem: { type: Boolean, required: true},
    Rarity: { type: Number},
    ShortName: { type: String, required: true},
    ammoCaliber: { type: String},
    weapUseType: { type: String},
    CreditsPrice: { type: Number, required: true},
    weapClass: { type: String},
    inStock: {type: Number},
    ImagePath: { type: String}
},  {collection: 'items'});

mongoose.model('item', itemSchema);

/*
"5ea03f7400685063ec28bfa8": {
    *"_id": "5ea03f7400685063ec28bfa8",
    "_name": "weapon_zis_ppsh41_762x25",
    "_parent": "5447b5e04bdc2d62278b4567",
    "_props": {
        "AdjustCollimatorsToTrajectory": false,
        "AimPlane": 0.15,
        "AimSensitivity": 0.65,
        "AllowFeed": false,
        "AllowJam": false,
        "AllowMisfire": false,
        "AllowOverheat": true,
        "AllowSlide": false,
        "AllowSpawnOnLocations": [],
        "AnimationVariantsNumber": 0,
        "BackgroundColor": "black",
        "BaseMalfunctionChance": 0.15,
        "BoltAction": false,
        "BurstShotsCount": 3,
        "CameraRecoil": 0.18,
        "CameraSnap": 3.5,
        "CanPutIntoDuringTheRaid": true,
        "CanQueueSecondShot": true,
        "CanRequireOnRagfair": true,
        "CanSellOnRagfair": true,
        "CantRemoveFromSlotsDuringRaid": [],
        "CenterOfImpact": 0.1,
        "Chambers": [],
        "ChangePriceCoef": 1,
        "CompactHandling": false,
        "ConflictingItems": [],
        "Convergence": 1.5,
        "CoolFactorGun": 4,
        "CoolFactorGunMods": 1,
        *"CreditsPrice": 10251,
        *"Description": "The PPSh-41 (Pistolet-Pulemyot Shpagina - \"Shpagin's submachine gun\") is a Soviet submachine gun designed by Georgy Shpagin as a cheap, reliable, and simplified alternative to the PPD-40.",
        "DeviationCurve": 2.25,
        "DeviationMax": 11,
        "DiscardingBlock": false,
        "DoubleActionAccuracyPenalty": 1.5,
        *"Durability": 95,
        "DurabilityBurnRatio": 1,
        *"Ergonomics": 16,
        "ExamineExperience": 8,
        "ExamineTime": 1,
        "ExaminedByDefault": false,
        "ExtraSizeDown": 0,
        "ExtraSizeForceAdd": false,
        "ExtraSizeLeft": 0,
        "ExtraSizeRight": 0,
        "ExtraSizeUp": 0,
        "FixedPrice": false,
        "Foldable": false,
        "FoldedSlot": "",
        "Grids": [],
        "HeatFactorByShot": 2.1,
        "HeatFactorGun": 1,
        "Height": 1,
        "HideEntrails": false,
        "HipAccuracyRestorationDelay": 0.2,
        "HipAccuracyRestorationSpeed": 7,
        "HipInnaccuracyGain": 0.16,
        "IronSightRange": 50,
        "IsAlwaysAvailableForInsurance": false,
        "IsLockedafterEquip": false,
        "IsUnbuyable": false,
        "IsUndiscardable": false,
        "IsUngivable": false,
        "IsUnsaleable": false,
        "ItemSound": "weap_ar",
        "LootExperience": 30,
        "ManualBoltCatch": false,
        "MaxDurability": 100,
        "MaxRepairDegradation": 0.04,
        "MergesWithChildren": true,
        "MinRepairDegradation": 0,
        "MustBoltBeOpennedForExternalReload": false,
        "MustBoltBeOpennedForInternalReload": false,
        *"Name": "PPSh-41 7.62x25 submachine gun",
        "NotShownInSlot": false,
        "OperatingResource": 5000,
        "Prefab": {
            "path": "assets/content/weapons/ppsh41/weapon_zis_ppsh41_762x25_container.bundle",
            "rcid": ""
        },
        *"QuestItem": false,
        "RagFairCommissionModifier": 1,
        *"Rarity": "Common",
        "RecoilAngle": 110,
        "RecoilCenter": {
            "x": 0,
            "y": -0.25,
            "z": 0
        },
        "RecoilForceBack": 360,
        "RecoilForceUp": 77,
        "RecoilPosZMult": 1,
        "RecolDispersion": 25,
        "ReloadMode": "ExternalMagazine",
        "RepairComplexity": 0,
        "RepairCost": 51,
        "RepairSpeed": 15,
        "Retractable": false,
        "RotationCenter": {
            "x": 0,
            "y": -0.1,
            "z": -0.03
        },
        "RotationCenterNoStock": {
            "x": 0,
            "y": -0.27,
            "z": -0.08
        },
        "SendToClient": false,
        *"ShortName": "PPSh41",
        "SightingRange": 100,
        "SingleFireRate": 450,
        "SizeReduceRight": 0,
        "Slots": [
            {
                "_id": "5ea03f7400685063ec28bfab",
                "_mergeSlotWithChildren": false,
                "_name": "mod_stock",
                "_parent": "5ea03f7400685063ec28bfa8",
                "_props": {
                    "filters": [
                        {
                            "Filter": [
                                "5ea03e9400685063ec28bfa4"
                            ],
                            "Shift": 0
                        }
                    ]
                },
                "_proto": "55d30c4c4bdc2db4468b457e",
                "_required": true
            },
            {
                "_id": "5ea03f7400685063ec28bfad",
                "_mergeSlotWithChildren": false,
                "_name": "mod_magazine",
                "_parent": "5ea03f7400685063ec28bfa8",
                "_props": {
                    "filters": [
                        {
                            "AnimationIndex": -1,
                            "Filter": [
                                "5ea034eb5aad6446a939737b",
                                "5ea034f65aad6446a939737e"
                            ]
                        }
                    ]
                },
                "_proto": "55d30c394bdc2dae468b4577",
                "_required": false
            },
            {
                "_id": "5ea03f7400685063ec28bfaf",
                "_mergeSlotWithChildren": false,
                "_name": "mod_reciever",
                "_parent": "5ea03f7400685063ec28bfa8",
                "_props": {
                    "filters": [
                        {
                            "Filter": [
                                "5ea03e5009aa976f2e7a514b"
                            ],
                            "Shift": 0
                        }
                    ]
                },
                "_proto": "55d30c4c4bdc2db4468b457e",
                "_required": true
            },
            {
                "_id": "5ea06b13fadf1d18c87b0774",
                "_mergeSlotWithChildren": false,
                "_name": "mod_barrel",
                "_parent": "5ea03f7400685063ec28bfa8",
                "_props": {
                    "filters": [
                        {
                            "Filter": [
                                "5ea02bb600685063ec28bfa1"
                            ],
                            "Shift": 0
                        }
                    ]
                },
                "_proto": "55d30c4c4bdc2db4468b457e",
                "_required": true
            }
        ],
        "SpawnChance": 3,
        "StackMaxSize": 1,
        "StackObjectsCount": 1,
        "TacticalReloadFixation": 0.95,
        "TacticalReloadStiffnes": {
            "x": 0.95,
            "y": 0.33,
            "z": 0.95
        },
        "Unlootable": false,
        "UnlootableFromSide": [],
        "UnlootableFromSlot": "FirstPrimaryWeapon",
        "UsePrefab": {
            "path": "",
            "rcid": ""
        },
        "Velocity": -17.9,
        "Weight": 1.01,
        "Width": 1,
        *"ammoCaliber": "Caliber762x25TT",
        "bEffDist": 200,
        "bFirerate": 1000,
        "bHearDist": 80,
        "chamberAmmoCount": 1,
        "defAmmo": "5735ff5c245977640e39ba7e",
        "defMagType": "5ea034eb5aad6446a939737b",
        "durabSpawnMax": 75,
        "durabSpawnMin": 25,
        "isBoltCatch": false,
        "isChamberLoad": true,
        "isFastReload": true,
        "shotgunDispersion": 0,
        "weapClass": "smg",
        "weapFireType": [
            "single",
            "fullauto"
        ],
        "weapUseType": "primary"
    },
    "_proto": "5447a9cd4bdc2dbd208b4567",
    "_type": "Item"
}
*/